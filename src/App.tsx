import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import "assets/font/bebas-neue/BebasNeue.otf";
import { useAuth } from "hooks/useAuth";
import { useEffect, useState } from "react";
// ----------
// Pages
// ----------
import LoaderPage from "components/ui/LoaderPage";
import Home from "pages/Home";
import MainLayout from "components/app/MainLayout";
import Channel from "pages/Channel";
import Login from "pages/Login";
import Register from "pages/Register";
import Profile from "pages/Profile";
import UserFavorites from "pages/UserFavorites";
import UserSubscriptions from "pages/UserSubscriptions";
import ForgotPassword from "pages/ForgotPassword";
import ResetPassword from "pages/ResetPassword";


function App() {
  const { user, isLoading: isUserLoading } = useAuth();
  const location = useLocation();
  let navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !isUserLoading)
      if (!user?.email && location.pathname.match(/user/)) {
        navigate("/login");
      } else if (
        user?.email &&
        location.pathname.match(/login|register|reset-password|forgot-password/)
      ) {
        navigate("/");
      }
  }, [location, navigate, user, loading, isUserLoading]);

  if (loading) {
    return <LoaderPage />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="channel/:channelId" element={<Channel />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/list" element={<UserFavorites />} />
        <Route path="user/subscriptions" element={<UserSubscriptions />} />
      </Route>
    </Routes>
  );
}

export default App;
