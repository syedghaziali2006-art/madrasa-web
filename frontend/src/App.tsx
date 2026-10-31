import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Public pages
import HomePage from './pages/HomePage';
import PolicyPage from './pages/PolicyPage';
import HistoryStaffPage from './pages/HistoryStaffPage';
import LibraryPage from './pages/LibraryPage';
import IntroductionPage from './pages/IntroductionPage';
import WomensDepartmentPage from './pages/WomensDepartmentPage';

// Admin pages
import AdminLayout from './pages/admin/AdminLayout';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminAdmissionsPage from './pages/admin/AdminAdmissionsPage';
import AdminBooksPage from './pages/admin/AdminBooksPage';
import AdminStaffPage from './pages/admin/AdminStaffPage';
import AdminGalleryPage from './pages/admin/AdminGalleryPage';
import AdminDonationsPage from './pages/admin/AdminDonationsPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';

import AdminHomePage from './pages/admin/AdminHomePage';

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/policy" element={<PolicyPage />} />
      <Route path="/history-staff" element={<HistoryStaffPage />} />
      <Route path="/library" element={<LibraryPage />} />
      <Route path="/kutub-khana" element={<Navigate to="/library" replace />} />
      <Route path="/introduction" element={<IntroductionPage />} />
      <Route path="/womens-department" element={<WomensDepartmentPage />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="homepage" element={<AdminHomePage />} />
        <Route path="admissions" element={<AdminAdmissionsPage />} />
        <Route path="books" element={<AdminBooksPage />} />
        <Route path="staff" element={<AdminStaffPage />} />
        <Route path="gallery" element={<AdminGalleryPage />} />
        <Route path="donations" element={<AdminDonationsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      {/* Catch-all: redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
