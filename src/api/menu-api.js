import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const menuApi = {
    myMenu: () =>
        api.call("post", apiConfig.menuUrl + "/my-menu/" + settings.projectId),

    load: (projectId) =>
        api.call("post", apiConfig.menuUrl + "/load/" + projectId),

    insertApp: (data) =>
        api.call("post", apiConfig.menuUrl + "/insert-app", data),

    updateApp: (data) =>
        api.call("post", apiConfig.menuUrl + "/update-app", data),

    deleteApp: (list) =>
        api.call(
            "post",
            apiConfig.menuUrl + "/delete-app",
            list.map((x) => x.id)
        ),

    insertMenu: (projectId, data) =>
        api.call("post", apiConfig.menuUrl + `/insert-menu/${projectId}`, data),

    updateMenu: (projectId, data) =>
        api.call("post", apiConfig.menuUrl + `/update-menu/${projectId}`, data),

    deleteMenu: (projectId, id) =>
        api.call(
            "post",
            apiConfig.menuUrl + `/delete-menu/${projectId}/${id}`,
            null
        ),

    insertFolder: (projectId, data) =>
        api.call(
            "post",
            apiConfig.menuUrl + `/insert-folder/${projectId}`,
            data
        ),

    updateFolder: (projectId, data) =>
        api.call(
            "post",
            apiConfig.menuUrl + `/update-folder/${projectId}`,
            data
        ),

    deleteFolder: (projectId, id) =>
        api.call(
            "post",
            apiConfig.menuUrl + `/delete-folder/${projectId}/${id}`,
            null
        ),
};
