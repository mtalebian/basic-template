import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const roleApi = {
  getRoles: (projectId) => api.directCall("get", apiConfig.roleUrl + "/roles/" + projectId),

  getRole: (projectId, id) => api.call("get", apiConfig.roleUrl + `/role-by-id/${projectId}/${id}`, null),

  deleteRole: (projectId, id) => api.call("delete", apiConfig.roleUrl + `/delete-role/${projectId}/${id}`, null),

  getAzObjects: (projectId) => api.directCall("get", apiConfig.roleUrl + "/azObjects/" + projectId),

  getAzObjectFields: (projectId, objectId) => api.directCall("post", apiConfig.roleUrl + `/azObjectFields/${projectId}/${objectId}`),
};
