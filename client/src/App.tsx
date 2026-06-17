import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
