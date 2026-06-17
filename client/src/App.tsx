import React from "react";
import { Toaster } from "sonner";
import { Login } from "./pages/Login";

function App() {
  return (
    <>
      <Toaster theme="dark" position="bottom-right" />
      <Login />
    </>
  );
}

export default App;
