import { Routes, Route } from "react-router-dom";
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
import UserList from "pages/UserList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="channel/:channelId" element={<Channel />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="user/profile" element={<Profile />} />
        <Route path="user/list" element={<UserList />} />
      </Route>
    </Routes>
  );
}

export default App;
