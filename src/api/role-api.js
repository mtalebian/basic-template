import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const roleApi = {
  getRoles: () => api.directCall("get", apiConfig.roleUrl + "/roles/" + settings.projectId),

  getRole: (id) => api.call("get", apiConfig.roleUrl + `/role-by-id/${settings.projectId}/${id}`, null),

  deleteRole: (id) => api.call("delete", apiConfig.roleUrl + `/delete-role/${settings.projectId}/${id}`, null),
};
