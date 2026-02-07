import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";
import AppLayout from "../layout/AppLayout";
import Login from "../features/auth/Login";
import useAuth from "../hooks/useAuth";
import { isTokenExpired } from "../utils/jwt";

// Lazy loaded pages
const Dashboard = lazy(() =>
    import("../features/dashboard/Dashboard")
);

const CampaignList = lazy(() =>
    import("../features/campaigns/CampaignList")
);

// 🔐 Protected Route (authenticated users only)
const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// 🔐 Role-Based Protected Route (authorization)
const RoleProtectedRoute = ({ children, allowedRoles }) => {
    const { token, user } = useSelector((state) => state.auth);

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

// 🌐 Public Route (only for logged-out users)
const PublicRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token);
    return token ? <Navigate to="/" replace /> : children;
};

const AppRoutes = () => {
    return (
        <Suspense fallback={<p>Loading page...</p>}>
            <Routes>
                {/* Login */}
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AppLayout>
                                <Dashboard />
                            </AppLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Campaigns - Admin only */}
                <Route
                    path="/campaigns"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <AppLayout>
                                <CampaignList />
                            </AppLayout>
                        </RoleProtectedRoute>
                    }
                />


                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
