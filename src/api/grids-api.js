import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const gridsApi = {
    getGroups: () => api.call("post", `${apiConfig.gridsUrl}/get-groups?projectId=${settings.projectId}`),

    browseGrid: (id, filters) => api.call("post", `${apiConfig.gridsUrl}/browse-grid?projectId=${settings.projectId}&id=${id}`, filters),

    getSchema: (id) => api.call("post", `${apiConfig.gridsUrl}/get-schema?projectId=${settings.projectId}&id=${id}`, null),

    save: (gridId, values, insertMode) => {
        var dto = { action: insertMode ? "insert" : "update", gridId, values };
        return api.call("post", `${apiConfig.gridsUrl}/exec-grid-action?projectId=${settings.projectId}`, dto);
    },

    delete: (gridId, values) => {
        var dto = { action: "delete", gridId, values };
        return api.call("post", `${apiConfig.gridsUrl}/exec-grid-action?projectId=${settings.projectId}`, dto);
    },
};
