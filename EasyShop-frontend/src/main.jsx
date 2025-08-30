import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Router_Custom from "./router/Router.jsx";
import { Provider } from "react-redux";
import { store } from "./app/Store.js";
import AppWrapper from "./AppWrapper.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppWrapper>
          <Router_Custom />
        </AppWrapper>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
