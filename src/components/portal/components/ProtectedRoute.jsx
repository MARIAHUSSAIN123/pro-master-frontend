import { Navigate } from "react-router-dom";
import { getStoredPortalUser } from "../api/authApi";

// Wrap any portal route: <ProtectedRoute><Dashboard /></ProtectedRoute>
// Checks both that a portal token exists AND that the stored user's
// role is "customer" — so an admin who happens to open /portal/* in
// the same browser doesn't fall through using their own session.
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("portalToken");
  const user = getStoredPortalUser();

  if (!token || !user || user.role !== "customer") {
    return <Navigate to="/portal/login" replace />;
  }

  return children;
}