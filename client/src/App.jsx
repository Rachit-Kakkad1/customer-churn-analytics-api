import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Landing } from "./pages/Landing.jsx";
import { Login } from "./pages/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "rgba(12, 12, 20, 0.95)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
            color: "#fff",
            borderRadius: "14px",
            boxShadow: "0 20px 60px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04)",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
