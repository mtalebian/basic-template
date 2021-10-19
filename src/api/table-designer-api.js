import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const tableDesignerApi = {
    getGroups: () => api.call("post", `${apiConfig.tableDesignerUrl}/get-groups?projectId=${settings.projectId}`),

    saveGroup: (group, insertMode) => {
        var g = { ...group };
        delete g.items;
        var actionName = insertMode ? "insert-group" : "update-group";
        return api.call("post", `${apiConfig.tableDesignerUrl}/${actionName}?projectId=${settings.projectId}`, g);
    },

    deleteGroup: (groupId) => {
        return api.call("post", `${apiConfig.tableDesignerUrl}/delete-group?projectId=${settings.projectId}&groupId=${groupId}`);
    },

    getTable: (tableName) =>
        api.call("post", `${apiConfig.tableDesignerUrl}/get-table?projectId=${settings.projectId}&tableName=${tableName}`),

    saveTable: (groupId, table) =>
        api.call("post", `${apiConfig.tableDesignerUrl}/save-table?projectId=${settings.projectId}&groupId=${groupId}`, { ...table }),

    deleteTable: (tableName) => {
        return api.call("post", `${apiConfig.tableDesignerUrl}/delete-table?projectId=${settings.projectId}&tableName=${tableName}`);
    },

    schemaColumn: (tableName) => {
        return api.call("post", `${apiConfig.tableDesignerUrl}/schema-columns?tableName=${tableName}`);
    },

    // saveColumn: (tableName, column, insertMode) => {
    //     var actionName = insertMode ? "insert-column" : "update-column";
    //     return api.call("post", `${apiConfig.tableDesignerUrl}/${actionName}?projectId=${settings.projectId}&tableName=${tableName}`, column);
    // },

    // deleteColumn: (columnId) => {
    //     return api.call("post", `${apiConfig.tableDesignerUrl}/delete-column?id=${columnId}`);
    // },
};
