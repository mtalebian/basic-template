import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const menuApi = {
    myMenu: () => api.call("post", apiConfig.menuUrl + "/my-menu/" + settings.projectId),

    load: (projectId) => api.call("post", apiConfig.menuUrl + "/load/" + projectId),

    insertApp: (data) => api.call("post", apiConfig.menuUrl + "/insert-app", data),

    updateApp: (data) => api.call("post", apiConfig.menuUrl + "/update-app", data),

    deleteApp: (list) =>
        api.call(
            "post",
            apiConfig.menuUrl + "/delete-app",
            list.map((x) => x.id)
        ),

    saveMenu: (projectId, data, insertMode) => {
        var action = insertMode ? "insert" : "update";
        return api.call("post", `${apiConfig.menuUrl}/${action}-menu/${projectId}`, data);
    },

    deleteMenu: (projectId, id) => api.call("post", apiConfig.menuUrl + `/delete-menu/${projectId}/${id}`, null),

    saveFolder: (projectId, data, insertMode) => {
        var action = insertMode ? "insert" : "update";
        return api.call("post", `${apiConfig.menuUrl}/${action}-folder/${projectId}`, data);
    },

    deleteFolder: (projectId, id) => api.call("post", apiConfig.menuUrl + `/delete-folder/${projectId}/${id}`, null),
};
