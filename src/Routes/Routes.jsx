import { createBrowserRouter } from "react-router-dom";

import Login from "../Pages/auth/Login";
import ForgetPassword from "../Pages/auth/ForgetPassword";
import VerifyCode from "../Pages/auth/VerifyCode";
import SetNewPassword from "../Pages/auth/SetNewPassword";

import AdminRoute from "../ProtectedRoute/AdminRoute";
import Dashboard from "../Pages/layout/Dashboard";
import PrivacyPolicy from "../Pages/privacyPolicy/PrivacyPolicy";
import TermsAndConditions from "../Pages/termsAndConditions/TermsAndConditions";
import Profile from "../Pages/profile/Profile";
import ErrorBoundary from "../ErrorBoundary";
import DashboardHome from "../Pages/dashboardHome/DashboardHome";
import PatientsPage from "../Pages/patients/PatientsPage";
import PatientDetail from "../Pages/patients/PatientDetail";
import CliniciansPage from "../Pages/clinician/CliniciansPage";
import CliniciansDetail from "../Pages/clinician/CliniciansDetail";
import ConnectionsPage from "../Pages/connections/ConnectionsPage";
import AnalyticsPage from "../Pages/analytics/AnalyticsPage";
import AlertsPage from "../Pages/alerts/AlertsPage";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorBoundary />,
    element: (
      <AdminRoute>
        <Dashboard />
      </AdminRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "/patients",
        element: <PatientsPage />,
      },
      {
        path: "/patients/:id",
        element: <PatientDetail />,
      },
      {
        path: "/clinicians",
        element: <CliniciansPage />,
      },
      {
        path: "/clinicians/:id",
        element: <CliniciansDetail />,
      },
      {
        path: "/connections",
        element: <ConnectionsPage />,
      },
      {
        path: "/alerts",
        element: <AlertsPage />,
      },
      {
        path: "/analytics",
        element: <AnalyticsPage />,
      },

      {
        path: "/settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/settings/terms-and-condition",
        element: <TermsAndConditions />,
      },
      {
        path: "/settings/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/forget-password",
    element: <ForgetPassword />,
  },
  {
    path: "/verify-code",
    element: <VerifyCode />,
  },
  {
    path: "/reset-password",
    element: <SetNewPassword />,
  },
]);
export default router;
