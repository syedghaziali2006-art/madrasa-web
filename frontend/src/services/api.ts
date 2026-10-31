// API client for Madrasa Sahib uz Zaman Frontend & Admin Panel

const API_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
  (typeof process !== "undefined" && process.env && (process.env.VITE_API_URL || process.env.NEXT_PUBLIC_API_URL)) ||
  "/api";

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("msz_admin_token");
};

export const setAuthToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("msz_admin_token", token);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("msz_admin_token");
    localStorage.removeItem("msz_admin_user");
  }
};

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("msz_admin_user");
  return user ? JSON.parse(user) : null;
};

export const setStoredUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("msz_admin_user", JSON.stringify(user));
  }
};

async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error: any) {
    // If backend is down or unreachable, throw clean error
    throw error;
  }
}

export const api = {
  // Authentication
  auth: {
    login: (credentials: { email: string; password: string }) =>
      fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      }),
    me: () => fetchApi("/auth/me"),
    changePassword: (data: { currentPassword: string; newPassword: string }) =>
      fetchApi("/auth/change-password", {
        method: "POST",
        body: JSON.stringify(data),
      }),
  },

  // Admissions
  admissions: {
    submit: (admissionData: any) =>
      fetchApi("/admissions", {
        method: "POST",
        body: JSON.stringify(admissionData),
      }),
    getAll: (params?: { status?: string; search?: string }) => {
      const query = new URLSearchParams();
      if (params?.status) query.append("status", params.status);
      if (params?.search) query.append("search", params.search);
      const qs = query.toString() ? `?${query.toString()}` : "";
      return fetchApi(`/admissions${qs}`);
    },
    getById: (id: string) => fetchApi(`/admissions/${id}`),
    update: (id: string, updates: any) =>
      fetchApi(`/admissions/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      fetchApi(`/admissions/${id}`, {
        method: "DELETE",
      }),
    getStats: () => fetchApi("/admissions/stats/summary"),
  },

  // Books
  books: {
    getAll: (params?: { category?: string; language?: string; search?: string }) => {
      const query = new URLSearchParams();
      if (params?.category) query.append("category", params.category);
      if (params?.language) query.append("language", params.language);
      if (params?.search) query.append("search", params.search);
      const qs = query.toString() ? `?${query.toString()}` : "";
      return fetchApi(`/books${qs}`);
    },
    getCategories: () => fetchApi("/books/categories/list"),
    getById: (id: string) => fetchApi(`/books/${id}`),
    create: (bookData: any) =>
      fetchApi("/books", {
        method: "POST",
        body: JSON.stringify(bookData),
      }),
    update: (id: string, updates: any) =>
      fetchApi(`/books/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      fetchApi(`/books/${id}`, {
        method: "DELETE",
      }),
  },

  // Book Requests & Donations
  bookRequests: {
    submitRequest: (data: any) =>
      fetchApi("/book-requests/requests", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getAllRequests: () => fetchApi("/book-requests/requests"),
    updateRequest: (id: string, data: any) =>
      fetchApi(`/book-requests/requests/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    deleteRequest: (id: string) =>
      fetchApi(`/book-requests/requests/${id}`, {
        method: "DELETE",
      }),

    submitDonation: (data: any) =>
      fetchApi("/book-requests/donations", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getAllDonations: () => fetchApi("/book-requests/donations"),
    updateDonation: (id: string, data: any) =>
      fetchApi(`/book-requests/donations/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    deleteDonation: (id: string) =>
      fetchApi(`/book-requests/donations/${id}`, {
        method: "DELETE",
      }),
  },

  // Staff
  staff: {
    getAll: (category?: string) => {
      const qs = category && category !== "all" ? `?category=${category}` : "";
      return fetchApi(`/staff${qs}`);
    },
    create: (data: any) =>
      fetchApi("/staff", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, updates: any) =>
      fetchApi(`/staff/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      fetchApi(`/staff/${id}`, {
        method: "DELETE",
      }),
  },

  // Gallery
  gallery: {
    getAll: (params?: { section?: string; type?: string }) => {
      const query = new URLSearchParams();
      if (params?.section) query.append("section", params.section);
      if (params?.type) query.append("type", params.type);
      const qs = query.toString() ? `?${query.toString()}` : "";
      return fetchApi(`/gallery${qs}`);
    },
    create: (data: any) =>
      fetchApi("/gallery", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    update: (id: string, updates: any) =>
      fetchApi(`/gallery/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    delete: (id: string) =>
      fetchApi(`/gallery/${id}`, {
        method: "DELETE",
      }),
  },

  // Donations & Bank Accounts
  donations: {
    getAccounts: () => fetchApi("/donations/accounts"),
    addAccount: (data: any) =>
      fetchApi("/donations/accounts", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    updateAccount: (id: string, updates: any) =>
      fetchApi(`/donations/accounts/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    deleteAccount: (id: string) =>
      fetchApi(`/donations/accounts/${id}`, {
        method: "DELETE",
      }),

    submitSlip: (data: any) =>
      fetchApi("/donations/submit", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    getSubmissions: () => fetchApi("/donations/submissions"),
    updateSubmission: (id: string, updates: any) =>
      fetchApi(`/donations/submissions/${id}`, {
        method: "PUT",
        body: JSON.stringify(updates),
      }),
    deleteSubmission: (id: string) =>
      fetchApi(`/donations/submissions/${id}`, {
        method: "DELETE",
      }),
  },

  // Settings
  settings: {
    get: () => fetchApi("/settings"),
    update: (data: any) =>
      fetchApi("/settings", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  },

  // Homepage Dynamic Content & Sections
  homepage: {
    get: () => fetchApi("/homepage"),
    update: (data: any) =>
      fetchApi("/homepage", {
        method: "PUT",
        body: JSON.stringify(data),
      }),
    reset: () =>
      fetchApi("/homepage/reset", {
        method: "POST",
      }),
  },

  // Dashboard Stats
  stats: {
    getDashboard: () => fetchApi("/stats/dashboard"),
  },

  // Upload
  upload: {
    file: async (file: File) => {
      const token = getAuthToken();
      const formData = new FormData();
      formData.append("file", file);

      const headers: Record<string, string> = {};
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}/upload`, {
        method: "POST",
        headers,
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "فائل اپلوڈ کرنے میں ناکامی");
      }
      return data;
    },
  },
};
