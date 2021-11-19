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

    saveGrid: (grid) => api.call("post", `${apiConfig.gridBuilderUrl}/save-grid?projectId=${settings.projectId}`, { ...grid }),

    deleteGrid: (gridId) => {
        return api.call("post", `${apiConfig.gridBuilderUrl}/delete-grid?projectId=${settings.projectId}&gridId=${gridId}`);
    },

    schemaColumn: (tableName) => {
        return api.call("post", `${apiConfig.gridBuilderUrl}/schema-columns?tableName=${tableName}`);
    },
};
