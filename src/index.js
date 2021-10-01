import "./index.scss";

import "react-toastify/dist/ReactToastify.css";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { App } from "./app";
import i18n from "i18next";
import { initReactI18next, useTranslation } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n.use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "fa"],
        fallbackLng: "en",
        debug: false,

        detection: {
            order: ["cookie", "path", "querystring", "localStorage", "sessionStorage", "navigator", "htmlTag", "subdomain"],
            caches: ["localStorage", "cookie"],
        },
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
        react: { useSuspense: false },
    });

const loadingMarkup = (
    <div className="py-5 text-center">
        <h3>Loading..</h3>
    </div>
);

ReactDOM.render(
    <Suspense fallback={loadingMarkup}>
        <React.StrictMode>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </React.StrictMode>
        <ToastContainer
            rtl={false}
            limit={3}
            position="bottom-left"
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
        />
    </Suspense>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
