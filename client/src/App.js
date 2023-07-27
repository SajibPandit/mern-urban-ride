import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navigation from "./components/Navbar";
import protectedRoutes from "./components/ProtectedRoutes";
import Destination from "./pages/Destination";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Orders from './pages/Orders'
import GoogleMap from "./components/GoogleMap";
import LoginProcess from "./pages/LoginProcess";
import RegistrationProcess from "./pages/RegistrationProcess";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destination" element={<Destination />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/map" element={<GoogleMap />} />
        <Route path="/login-process" element={<LoginProcess />} />
        <Route path="/registration-process" element={<RegistrationProcess />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer className="mt-3" />
    </>
  );
}

export default App;
