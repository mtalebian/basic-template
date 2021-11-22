import { api } from "./api";
import { apiConfig } from "./config";

export const roleApi = {
  getRoles: (projectId) => api.call("get", apiConfig.roleUrl + "/roles/" + projectId),

    getRole: (projectId, id) => api.call("get", apiConfig.roleUrl + `/role-by-id/${projectId}/${id}`, null),

    deleteRole: (projectId, id) => api.call("delete", apiConfig.roleUrl + `/delete-role/${projectId}/${id}`, null),

  getAzObjectFields: (projectId, objectId) => api.call("post", apiConfig.roleUrl + `/azObjectFields/${projectId}/${objectId}`),

  saveRole: (insertMode, role) => {
    var action = insertMode ? "insert" : "update";
    var method = insertMode ? "post" : "put";
    var res = api.call(`${method}`, apiConfig.roleUrl + `/${action}-role`, role);
    return res;
  },
  //................................................
  getCompositeRoles: (projectId) => api.call("get", apiConfig.roleUrl + "/composite-roles/" + projectId),

    getCompositeRole: (projectId, id) => api.call("get", apiConfig.roleUrl + `/composite-role-by-id/${projectId}/${id}`, null),

    deleteCompositeRole: (projectId, id) => api.call("delete", apiConfig.roleUrl + `/delete-composite-role/${projectId}/${id}`, null),

    saveCompositeRole: (insertMode, compositeRole) => {
        var action = insertMode ? "insert" : "update";
        var method = insertMode ? "post" : "put";
        var res = api.call(`${method}`, apiConfig.roleUrl + `/${action}-composite-role`, compositeRole);
        return res;
    },

    //..............................................
    getUserRoles: (assignType, projectId, userId) => {
        var methodName = assignType === "role" ? "user-roles" : "user-composite-roles";
        var res = api.call("get", apiConfig.roleUrl + `/${methodName}/${projectId}/${userId}`, null);
        return res;
    },

    assignRole: (assignType, data) => {
        var methodName = assignType === "role" ? "insert-user-role" : "insert-user-composite-role";
        var res = api.call("post", apiConfig.roleUrl + `/${methodName}`, data);
        return res;
    },

    deleteAssignRole: (assignType, projectId, id, userId) => {
        var methodName = assignType === "role" ? "delete-user-role" : "delete-user-composite-role";
        var res = api.call("delete", apiConfig.roleUrl + `/${methodName}/${projectId}/${id}/${userId}`, null);
        return res;
    },
};
