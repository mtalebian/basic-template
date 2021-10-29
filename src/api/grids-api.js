import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const gridsApi = {
    getGroups: () => api.call("post", `${apiConfig.gridsUrl}/get-groups?projectId=${settings.projectId}`),

    browseGrid: (name) => api.call("post", `${apiConfig.gridsUrl}/browse-grid?projectId=${settings.projectId}&name=${name}`),

    save: (gridId, values, insertMode) => {
        var dto = { name: insertMode ? "insert" : "update", gridId, values };
        return api.call("post", `${apiConfig.gridsUrl}/exec-grid-action?projectId=${settings.projectId}`, dto);
    },

    delete: (gridId, values) => {
        var dto = { name: "delete", gridId, values };
        return api.call("post", `${apiConfig.gridsUrl}/exec-grid-action?projectId=${settings.projectId}`, dto);
    },
};
