import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const gridBuilderApi = {
    getGroups: () => api.call("post", `${apiConfig.gridBuilderUrl}/get-groups?projectId=${settings.projectId}`),

    saveGroup: (group, insertMode) => {
        var g = { ...group };
        delete g.items;
        var actionName = insertMode ? "insert-group" : "update-group";
        return api.call("post", `${apiConfig.gridBuilderUrl}/${actionName}?projectId=${settings.projectId}`, g);
    },

    deleteGroup: (groupId) => {
        return api.call("post", `${apiConfig.gridBuilderUrl}/delete-group?projectId=${settings.projectId}&groupId=${groupId}`);
    },

    getGrid: (gridId) => api.call("post", `${apiConfig.gridBuilderUrl}/get-grid?projectId=${settings.projectId}&id=${gridId}`),

    saveGrid: (groupId, grid) =>
        api.call("post", `${apiConfig.gridBuilderUrl}/save-grid?projectId=${settings.projectId}&groupId=${groupId}`, { ...grid }),

    deleteGrid: (gridId) => {
        return api.call("post", `${apiConfig.gridBuilderUrl}/delete-grid?projectId=${settings.projectId}&gridId=${gridId}`);
    },

    schemaColumn: (gridId) => {
        return api.call("post", `${apiConfig.gridBuilderUrl}/schema-columns?projectId=${settings.projectId}&gridId=${gridId}`);
    },
};
