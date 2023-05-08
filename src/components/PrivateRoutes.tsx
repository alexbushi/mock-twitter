import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  // eslint-disable-next-line
  const [user, loading, error] = useAuthState(auth);
  if (!user && !loading) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoutes;
