import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";

// ----------
// Pages
// ----------
import Home from "pages/Home";
import MainLayout from "components/app/MainLayout";
import Channel from "pages/Channel";
import Login from "pages/Login";
import Register from "pages/Register";
import Profile from "pages/Profile";
import UserFavorites from "pages/UserFavorites";
import UserSubscriptions from "pages/UserSubscriptions";
import { useAuth } from "hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  let navigate = useNavigate();

  useEffect(() => {
    if (!user?.email && location.pathname.match(/user/)) {
      navigate("/login");
    } else if (user?.email && location.pathname.match(/login|register/)) {
      navigate("/");
    }
  }, [location, navigate, user]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="channel/:channelId" element={<Channel />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/list" element={<UserFavorites />} />
        <Route path="user/subscriptions" element={<UserSubscriptions />} />
      </Route>
    </Routes>
  );
}

export default App;
