import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CardsProvider } from "./CardsContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CardsProvider>
      <App />
    </CardsProvider>
  </React.StrictMode>
);

