import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SellPage from "./pages/SellPage";
import Footer from "./components/common/Footer";
import AdminPage from "./pages/AdminPage";
import PropertyDetails from "./components/property/PropertyDetails";
import ScrollToTop from "./utils/ScrollTop";
import WhatsAppButton from "./components/common/WhatsAppButton";
import RentPage from "./pages/RentPage";
import OwnerPage from "./pages/OwnerPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
function App() {
  return (
    <div className="relative ">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/:cat" element={<SellPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/rent" element={<RentPage />} />
          <Route path="/rent/owner" element={<OwnerPage />} />
          <Route path="/about us" element={<AboutUs />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
      <WhatsAppButton />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
