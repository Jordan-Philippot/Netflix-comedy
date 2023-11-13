import { Routes, Route } from "react-router-dom";
import "./App.css";

// ----------
// Pages
// ----------
import Home from "pages/Home";
import MainLayout from "components/app/MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

    </Routes>
  );
}

export default App;
