import { api } from "./api";
import { apiConfig } from "./config";

export const compositeRoleApi = {
  getCompositeRoles: (projectId) => api.directCall("get", apiConfig.compositeRoleUrl + "/composite-roles/" + projectId),

  getCompositeRole: (projectId, id) => api.call("get", apiConfig.compositeRoleUrl + `/composite-role-by-id/${projectId}/${id}`, null),

  deleteCompositeRole: (projectId, id) => api.call("delete", apiConfig.compositeRoleUrl + `/delete-composite-role/${projectId}/${id}`, null),

  saveCompositeRole: (insertMode, compositeRole) => {
    var action = insertMode ? "insert" : "update";
    var method = insertMode ? "post" : "put";
    var res = api.call(`${method}`, apiConfig.compositeRoleUrl + `/${action}-composite-role`, compositeRole);
    return res;
  },
};
