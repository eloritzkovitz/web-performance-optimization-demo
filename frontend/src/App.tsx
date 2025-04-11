import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import MainPage from "./pages/MainPage";
import BaselinePage from "./pages/BaselinePage";
import OptimizedPage from "./pages/OptimizedPage";

export default function App() {
  return (
    <Router>
      <MainPage>
        <Routes>
          <Route path="/baseline" element={<BaselinePage />} />
          <Route path="/optimized" element={<OptimizedPage />} />
        </Routes>
      </MainPage>
    </Router>
  );
}