import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getSeedData } from "./seedData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "..", "data");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

class Collection {
  constructor(name, initialData = []) {
    this.name = name;
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    this.init(initialData);
  }

  init(initialData) {
    if (!fs.existsSync(this.filePath)) {
      this.writeSync(initialData);
    }
  }

  readSync() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const raw = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      console.error(`Error reading ${this.name}.json:`, err);
      return [];
    }
  }

  writeSync(data) {
    try {
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
      fs.renameSync(tempPath, this.filePath);
      return true;
    } catch (err) {
      console.error(`Error writing ${this.name}.json:`, err);
      return false;
    }
  }

  find(predicate = () => true) {
    const list = this.readSync();
    if (typeof predicate !== "function") return list;
    return list.filter(predicate);
  }

  findById(id) {
    const list = this.readSync();
    return list.find((item) => String(item.id) === String(id)) || null;
  }

  findOne(predicate) {
    const list = this.readSync();
    return list.find(predicate) || null;
  }

  insert(item) {
    const list = this.readSync();
    const newItem = {
      ...item,
      createdAt: item.createdAt || new Date().toISOString()
    };
    list.unshift(newItem); // Newest first
    this.writeSync(list);
    return newItem;
  }

  update(id, updates) {
    const list = this.readSync();
    const index = list.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return null;

    list[index] = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.writeSync(list);
    return list[index];
  }

  delete(id) {
    const list = this.readSync();
    const index = list.findIndex((item) => String(item.id) === String(id));
    if (index === -1) return false;

    list.splice(index, 1);
    this.writeSync(list);
    return true;
  }

  count(predicate = () => true) {
    const list = this.readSync();
    return list.filter(predicate).length;
  }
}

class SingletonDocument {
  constructor(name, initialData = {}) {
    this.name = name;
    this.filePath = path.join(DATA_DIR, `${name}.json`);
    if (!fs.existsSync(this.filePath)) {
      this.writeSync(initialData);
    }
  }

  get() {
    try {
      if (!fs.existsSync(this.filePath)) return {};
      const raw = fs.readFileSync(this.filePath, "utf-8");
      return JSON.parse(raw);
    } catch (err) {
      console.error(`Error reading ${this.name}.json:`, err);
      return {};
    }
  }

  writeSync(data) {
    try {
      const tempPath = `${this.filePath}.tmp`;
      fs.writeFileSync(tempPath, JSON.stringify(data, null, 2), "utf-8");
      fs.renameSync(tempPath, this.filePath);
      return true;
    } catch (err) {
      console.error(`Error writing ${this.name}.json:`, err);
      return false;
    }
  }

  update(updates) {
    const current = this.get();
    const merged = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.writeSync(merged);
    return merged;
  }
}

// Initialize seed data if needed
const seed = getSeedData();

export const db = {
  users: new Collection("users", seed.users),
  admissions: new Collection("admissions", seed.admissions),
  books: new Collection("books", seed.books),
  bookRequests: new Collection("bookRequests", seed.bookRequests),
  bookDonations: new Collection("bookDonations", seed.bookDonations),
  staff: new Collection("staff", seed.staff),
  gallery: new Collection("gallery", seed.gallery),
  donationAccounts: new Collection("donationAccounts", seed.donationAccounts),
  donorSubmissions: new Collection("donorSubmissions", seed.donorSubmissions),
  whatsAppMessages: new Collection("whatsAppMessages", []),
  whatsappEvents: new Collection("whatsappEvents", []),
  settings: new SingletonDocument("settings", seed.settings),
  homeContent: new SingletonDocument("homeContent", seed.homeContent),
  policyContent: new SingletonDocument("policyContent", seed.policyContent || {}),
  historyContent: new SingletonDocument("historyContent", seed.historyContent || {}),
  womensContent: new SingletonDocument("womensContent", seed.womensContent || {})
};
