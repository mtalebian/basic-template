import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const tablesApi = {
    menu: () => api.call("post", `${apiConfig.tableDesignerUrl}/getGroups?projectId=${settings.projectId}`),
};
