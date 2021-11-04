import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const authorizationApi = {
  getRoles: () => api.directCall("get", apiConfig.authorizationUrl + "/roles/" + settings.projectId),

  getRole: (id) => api.call("get", apiConfig.authorizationUrl + `/role-by-id/${settings.projectId}/${id}`, null),

  deleteRole: (id) => api.call("delete", apiConfig.authorizationUrl + `/delete-role/${settings.projectId}/${id}`, null),
  
};
