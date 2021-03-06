import "./bootstrap.scss";
import "./index.scss";

import "react-toastify/dist/ReactToastify.css";

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import * as bd from "react-basic-design";
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

//-----------
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
            loadPath: apiConfig.localeUrl + "/locales/get-{{lng}}",
            addPath: apiConfig.localeUrl + "/locales/add-{{lng}}",
            crossDomain: true,
            withCredentials: true,
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

//-----------
const loadingMarkup = (
    <div className="py-5 text-center">
        <h3>Loading..</h3>
    </div>
);

//-----------
var t = bd.helper.getTheme();
bd.helper.setTheme(!t ? "bd-light" : t);

ReactDOM.render(
    <Suspense fallback={loadingMarkup}>
        <React.StrictMode>
            <BrowserRouter>
                <AccountProvider>
                    <App />
                </AccountProvider>
            </BrowserRouter>
        </React.StrictMode>
        <bd.MsgBoxContainer />
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
