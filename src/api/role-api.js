import { api } from "./api";
import { apiConfig } from "./config";

export const roleApi = {
  getRoles: (projectId) => api.directCall("get", apiConfig.roleUrl + "/roles/" + projectId),

  getRole: (projectId, id) => api.call("get", apiConfig.roleUrl + `/role-by-id/${projectId}/${id}`, null),

  deleteRole: (projectId, id) => api.call("delete", apiConfig.roleUrl + `/delete-role/${projectId}/${id}`, null),

  getAzObjectFields: (projectId, objectId) => api.directCall("post", apiConfig.roleUrl + `/azObjectFields/${projectId}/${objectId}`),

  saveRole: (insertMode, role) => {
    var action = insertMode ? "insert" : "update";
    var method = insertMode ? "post" : "put";
    var res = api.call(`${method}`, apiConfig.roleUrl + `/${action}-role`, role);
    return res;
  },
};
