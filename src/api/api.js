import axios from "axios";
import { messages } from "../components/messages";
import settings from "../app/settings";
import { apiConfig } from "./config";
import { BasicEvent } from "../components/basic/event/basic-event";

const withCredentials = true;

const onUnauthorizedEvent = new BasicEvent();
const onForbiddenEvent = new BasicEvent();

const genericeResponseHandler = (response) => {
    var data = response.data;
    if (!data) throw new Error("invalid response!");
    if (!data.isSuccess) {
        if (data.errorMessage === "401") throw newError(messages.Error401, "401");
        if (data.errorMessage === "403") throw newError(messages.Error403, "403");
        throw newError(data.errorMessage, "error");
    }
    return data.result;
};

function newError(message, name, stack) {
    var ex = new Error(message);
    if (!!name) ex.name = name;
    if (!!stack) ex.stack = stack;
    ex.stack = null;
    return ex;
}

function translateError(ex) {
    if (!ex) throw newError(messages.Unknown, "Unknown");
    if (ex.response) {
        if (ex.response.status === 401) throw newError(messages.Error401, "401");
        if (ex.response.status === 403) throw newError(messages.Error403, "403");
        if (ex.response.status === 404) throw newError(messages.Error404, "404");
        if (ex.response.status === 405) throw newError(messages.Error405, "404");
        if (ex.response.status === 500) throw newError(messages.Error500, "500");
    }
    if (ex instanceof Error) {
        if (ex.name === "401" || ex.name === "403") throw ex;
    }

    var message = ex.message ? ex.message : ex.toString ? ex.toString() : ex;
    var stack = ex.stack;

    if (message === "Network Error") throw newError(messages.NetworkError, "NetworkError", stack);
    if (message.startsWith("Failed to execute 'open' on 'XMLHttpRequest': Invalid URL")) throw newError(messages.InvalidUrl, "InvalidUrl", stack);
    throw newError(message, "Error");
}

function callAxios(method, url, data) {
    return axios({
        url,
        data,
        withCredentials,
        method,
        headers: {
            authorization: "Bearer " + api.token,
        },
    })
        .then(genericeResponseHandler)
        .catch(translateError);
}

export const api = {
    token: null,
    expiry: 0,

    onUnauthorized: (fn, ownerName) => onUnauthorizedEvent.add(fn, ownerName + ".onUnauthorized"),
    onForbidden: (fn, ownerName) => onForbiddenEvent.add(fn, ownerName + ".onForbidden"),

    call: (method, url, data) =>
        new Promise((resolve, reject) => {
            const handle_reject = (ex) => {
                if (ex.name === "401") {
                    onUnauthorizedEvent.dispatch(ex);
                    ex.handled = true;
                }
                if (ex.name === "403") {
                    onForbiddenEvent.dispatch(ex);
                    ex.handled = true;
                }
                reject(ex);
            };

            const handle_resolve = (data) => {
                resolve(data);
            };

            return callAxios(method, url, data)
                .then(handle_resolve)
                .catch((ex) => {
                    if (ex.name !== "401") handle_reject(ex);
                    else {
                        callAxios("post", apiConfig.accountUrl + "/refresh/" + settings.projectId)
                            .then((result) => {
                                api.token = result.token;
                                api.expiry = result.expiry;
                                callAxios(method, url, data).then(handle_resolve).catch(handle_reject);
                            })
                            .catch(handle_reject);
                    }
                });
        }),

    directCall: (method, url, data) =>
        callAxios(method, url, data).catch((ex) => {
            if (ex.name === "401") {
                onUnauthorizedEvent.dispatch(ex);
                ex.handled = true;
            }
            if (ex.name === "403") {
                onForbiddenEvent.dispatch(ex);
                ex.handled = true;
            }
            throw ex;
        }),
};
