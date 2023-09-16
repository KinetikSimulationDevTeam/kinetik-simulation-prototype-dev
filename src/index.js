import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Amplify, API } from "aws-amplify";
import awsconfig from "./aws-exports";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Help from "./Pages/FaqPage";
import Signin from "./Pages/SigninPage";
import PageNotFound from "./Pages/PageNotFound";
import Files from "./Pages/ManageFilesPage";
import SensitivityAnalysisPage from "./Pages/SensitivityAnalysisPage";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/help" element={<Help />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/files" element={<Files />} />
        <Route
          path="/sensitivityanalysis"
          element={<SensitivityAnalysisPage />}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
