import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const tablesApi = {
    getGroups: () => api.call("post", `${apiConfig.tablesUrl}/get-groups?projectId=${settings.projectId}`),

    browseTable: (name) => api.call("post", `${apiConfig.tablesUrl}/browse-table?projectId=${settings.projectId}&name=${name}`),

    save: (tableName, values, insertMode) => {
        var dto = { name: insertMode ? "insert" : "update", tableName, values };
        return api.call("post", `${apiConfig.tablesUrl}/exec-table-action?projectId=${settings.projectId}`, dto);
    },

    delete: (tableName, values) => {
        var dto = { name: "delete", tableName, values };
        return api.call("post", `${apiConfig.tablesUrl}/exec-table-action?projectId=${settings.projectId}`, dto);
    },
};
