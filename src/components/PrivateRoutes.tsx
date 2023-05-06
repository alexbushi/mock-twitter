import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const user = "";
  if (!user) return <Navigate to="/login" />;

  return <Outlet />;
};

export default PrivateRoutes;
