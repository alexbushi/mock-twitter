import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";
import RegistrationPage from "./pages/RegistrationPage";
import ProfilePage from "./pages/ProfilePage";
import MainList from "./components/MainList";
import ErrorPage from "./pages/ErrorPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import FollowingList from "./components/FollowingList";
import FollowerList from "./components/FollowerList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <PrivateRoutes />,
        children: [
          { path: "home", element: <MainList /> },
          { path: "profile/:username", element: <ProfilePage /> },
          { path: ":username/following", element: <FollowingList /> },
          { path: ":username/followers", element: <FollowerList /> },
        ],
      },
    ],
  },

  { path: "/login", element: <LoginPage /> },
  { path: "/registration", element: <RegistrationPage /> },
  { path: "/reset", element: <ResetPasswordPage /> },
]);

export default router;
