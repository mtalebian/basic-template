import { api } from "./api";
import { apiConfig } from "./config";

export const userApi = {
  getUsers: () => api.call("get", `${apiConfig.userUrl}/users`),

  getUser: (userId) => api.call("get", `${apiConfig.userUrl}/user-info?userId=${userId}`),

  deleteUser: (userId) => api.call("delete", `${apiConfig.userUrl}/delete-user?userId=${userId}`),

  saveUser: (insertMode, user) => {
    var action = insertMode ? "insert" : "update";
    var method = insertMode ? "post" : "put";
    var res = api.call(`${method}`, apiConfig.userUrl + `/${action}-user`, user);
    return res;
  },
};
