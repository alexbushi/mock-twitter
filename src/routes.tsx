import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    element: <PrivateRoutes />,
    children: [{ path: "/home", element: <App /> }],
  },
  { path: "/login", element: <LoginPage /> },
]);

export default router;
