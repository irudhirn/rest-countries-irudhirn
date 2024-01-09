import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import DarkModeProvider from "./contextStore/DarkModeProvider";
import RegionProvider from "./contextStore/RegionProvider";

import { BrowserRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <DarkModeProvider>
        <RegionProvider>
          <App />
        </RegionProvider>
      </DarkModeProvider>
    </Router>
  </React.StrictMode>
);
