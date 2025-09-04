import { BrowserRouter, Routes, Route } from "react-router-dom";

import Marketing from "./pages/MarketingPage";
import Home from "./pages/Home";
import PropertiesPage from "./pages/PropertiesPage";
import AboutUs from "./pages/AboutUs";
import SellPage from "./pages/SellPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
