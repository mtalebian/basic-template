import "./index.scss";

import "react-toastify/dist/ReactToastify.css";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import reportWebVitals from "./reportWebVitals";
import { App } from "./app";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";
import { apiConfig } from "./api/config";
import settings from "./app/settings";
import { AccountProvider } from "./app/account-context";
import { MsgBox } from "./components/msgbox/msgbox";

i18n.use(HttpApi)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        supportedLngs: ["en", "fa"],
        fallbackLng: "en",
        debug: false,
        saveMissing: settings.debugMode,

        detection: {
            order: ["cookie", "path", "querystring", "localStorage", "sessionStorage", "navigator", "htmlTag", "subdomain"],
            caches: ["localStorage", "cookie"],
        },
        backend: {
            //loadPath: "/locales/{{lng}}.json",
            loadPath: apiConfig.localeUrl + "/locales/{{lng}}.json",
        },
        // react: { useSuspense: false },
    });

i18n.on("missingKey", function (lngs, namespace, key, res) {
    const currentLanguageCode = settings.getLanguageCode();
    var lang_missings = settings.missingTranslations[currentLanguageCode];
    if (!lang_missings) {
        lang_missings = {};
        settings.missingTranslations[currentLanguageCode] = lang_missings;
    }
    lang_missings[key] = res;
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
                <AccountProvider>
                    <App />
                </AccountProvider>
            </BrowserRouter>
        </React.StrictMode>
        <MsgBox />
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
