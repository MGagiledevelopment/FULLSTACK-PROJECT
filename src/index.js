import React from "react";
import ReactDOM from "react-dom";
import "./styles/styles.css"
import { BrowserRouter} from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import App from "./App";

ReactDOM.render(
  
    <React.StrictMode>
      <AppProvider>

      <BrowserRouter>
      <App />
      </BrowserRouter>

      </AppProvider>
    </React.StrictMode>
  ,
  document.getElementById("root")
);
