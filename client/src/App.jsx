import React from "react";
import { AppProviders } from "./app/providers.jsx";
import { AppRouter } from "./router/AppRouter.jsx";

function App() {
  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
}

export default App;
