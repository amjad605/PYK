import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import SellPage from "./pages/SellPage";
import Footer from "./components/common/Footer";
import AdminPage from "./pages/AdminPage";
import PropertyDetails from "./components/propertyDetails/PropertyDetails";
import ScrollToTop from "./utils/ScrollTop";
import WhatsAppButton from "./components/common/WhatsAppButton";
import RentPage from "./pages/RentPage";
import OwnerPage from "./pages/OwnerPage";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AdminRoute from "./router/AdminRoute";
import { Dashboard } from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
function App() {
  return (
    <div className="relative ">
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/:cat" element={<SellPage />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/rent" element={<RentPage />} />
            <Route path="/rent/owner" element={<OwnerPage />} />
            <Route path="/about us" element={<AboutUs />} />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminPage />
                </AdminRoute>
              }
            />
            <Route path="admin/login" element={<LoginPage />} />
            <Route path="admin/signup" element={<SignupPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>

      <WhatsAppButton />
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
