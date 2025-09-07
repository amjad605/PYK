import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import AboutUs from "./pages/AboutUs";
import SellPage from "./pages/SellPage";

import Footer from "./components/common/Footer";
import PropertyPage from "./pages/propertyPage";
import AdminPage from "./pages/AdminPage";
import LOGO from "./assets/PYK INVEST Brand identity-23.svg";
import Navbar from "./components/common/NavBar";
import PropertyDetails from "./components/property/PropertyDetails";
function App() {
  return (
    <div className="relative ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/properties" element={<PropertyPage />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/Admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
