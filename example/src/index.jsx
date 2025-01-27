import React from "react";
import ReactDOM from "react-dom/client";
import { IntlProvider } from "react-intl";
import { App } from "./App";
import nlMessages from "./locales/lang/nl.json";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IntlProvider locale="nl" messages={nlMessages}>
      <App />
    </IntlProvider>
  </React.StrictMode>,
);
