import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const accountApi = {
    login: ({ userName, password, captcha }) =>
        api.directCall(
            "post",
            apiConfig.accountUrl + "/login/" + settings.projectId,
            { userName, password, captcha }
        ),
    userInfo: () =>
        api.directCall(
            "post",
            apiConfig.accountUrl + "/user-info/" + settings.projectId
        ),
    logout: () => api.directCall("post", apiConfig.accountUrl + "/logout"),
    refresh: () => api.refresh(settings.projectId),
};
