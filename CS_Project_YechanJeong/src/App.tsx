import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import CVPage from "./pages/CVPage";
import VisitorsPage from "./pages/VisitorsPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/cv" element={<CVPage />} />
        <Route path="/visitors" element={<VisitorsPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
