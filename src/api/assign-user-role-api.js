import { api } from "./api";
import { apiConfig } from "./config";

export const assignUserRoleApi = {
  getUserRoles: (assignType, projectId, userId) => {
    var methodName = assignType == "role" ? "user-roles" : "user-composite-roles";
    var res = api.call("get", apiConfig.assignUserRoleUrl + `/${methodName}/${projectId}/${userId}`, null);
    return res;
  },

  assignRole: (assignType, data) => {
    var methodName = assignType == "role" ? "insert-user-role" : "insert-user-composite-role";
    var res = api.call("post", apiConfig.assignUserRoleUrl + `/${methodName}`, data);
    return res;
  },

  deleteAssignRole: (assignType, projectId, id, userId) => {
    var methodName = assignType == "role" ? "delete-user-role" : "delete-user-composite-role";
    var res = api.call("delete", apiConfig.assignUserRoleUrl + `/${methodName}/${projectId}/${id}/${userId}`, null);
    return res;
  },
};
