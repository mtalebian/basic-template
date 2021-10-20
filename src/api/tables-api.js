import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const tablesApi = {
    getGroups: () => api.call("post", `${apiConfig.tablesUrl}/get-groups?projectId=${settings.projectId}`),
    browseTable: (name) => api.call("post", `${apiConfig.tablesUrl}/browse-table?projectId=${settings.projectId}&name=${name}`),
};
