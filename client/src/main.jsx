import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginComponent from "./page/login";
import CalendarPage from "./page/calendar";
import RegisterComponent from "./page/register";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/calendar" element={<CalendarPage />} />
    </Routes>
  </BrowserRouter>,
);
