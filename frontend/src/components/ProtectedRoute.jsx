import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

// Role-based access control on the frontend: only users with the given role can open the page.
// (The backend also checks the role, so this is only for a nicer experience.)
export default function ProtectedRoute({ role, children }) {
  const { user } = useAuth();
  if (!user || (role && user.role !== role)) return <Navigate to="/login" replace />;
  return children;
}
