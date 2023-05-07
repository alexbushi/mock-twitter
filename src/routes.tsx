import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {
    element: <PrivateRoutes />,
    children: [
      { path: "home", element: <App /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/registration", element: <RegistrationPage /> },
]);

export default router;
