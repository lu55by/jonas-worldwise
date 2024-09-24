import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="product" element={<Product />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
