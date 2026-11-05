import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// Public pages - code-split via React.lazy for instant load and high performance
const HomePage = lazy(() => import('./pages/HomePage'));
const PolicyPage = lazy(() => import('./pages/PolicyPage'));
const HistoryStaffPage = lazy(() => import('./pages/HistoryStaffPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const IntroductionPage = lazy(() => import('./pages/IntroductionPage'));
const WomensDepartmentPage = lazy(() => import('./pages/WomensDepartmentPage'));
const DastarkhwanPage = lazy(() => import('./pages/DastarkhwanPage'));

// Admin pages - lazy loaded on demand so they never block public users
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminLoginPage = lazy(() => import('./pages/admin/AdminLoginPage'));
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));
const AdminAdmissionsPage = lazy(() => import('./pages/admin/AdminAdmissionsPage'));
const AdminBooksPage = lazy(() => import('./pages/admin/AdminBooksPage'));
const AdminStaffPage = lazy(() => import('./pages/admin/AdminStaffPage'));
const AdminGalleryPage = lazy(() => import('./pages/admin/AdminGalleryPage'));
const AdminDonationsPage = lazy(() => import('./pages/admin/AdminDonationsPage'));
const AdminSettingsPage = lazy(() => import('./pages/admin/AdminSettingsPage'));
const AdminHomePage = lazy(() => import('./pages/admin/AdminHomePage'));
const AdminPolicyPage = lazy(() => import('./pages/admin/AdminPolicyPage'));
const AdminWomensPage = lazy(() => import('./pages/admin/AdminWomensPage'));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-screen bg-[#120A05]" />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/policy" element={<PolicyPage />} />
          <Route path="/history-staff" element={<HistoryStaffPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/kutub-khana" element={<Navigate to="/library" replace />} />
          <Route path="/introduction" element={<IntroductionPage />} />
          <Route path="/womens-department" element={<WomensDepartmentPage />} />
          <Route path="/dastarkhwan" element={<DastarkhwanPage />} />
          <Route path="/donation" element={<Navigate to="/dastarkhwan" replace />} />
          <Route path="/donations" element={<Navigate to="/dastarkhwan" replace />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="homepage" element={<AdminHomePage />} />
            <Route path="policy" element={<AdminPolicyPage />} />
            <Route path="staff" element={<AdminStaffPage />} />
            <Route path="womens" element={<AdminWomensPage />} />
            <Route path="books" element={<AdminBooksPage />} />
            <Route path="admissions" element={<AdminAdmissionsPage />} />
            <Route path="gallery" element={<AdminGalleryPage />} />
            <Route path="donations" element={<AdminDonationsPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

          {/* Catch-all: redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
}
