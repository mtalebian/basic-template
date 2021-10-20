import { api } from "./api";
import { apiConfig } from "./config";

export const userManagmentApi = {
  getUsers: () => api.call("get", `${apiConfig.userManegmentUrl}/users`),

  getUser: (userId) => api.call("get", `${apiConfig.userManegmentUrl}/user-info?userId=${userId}`),

  insertUser: (user) => api.call("post", apiConfig.userManegmentUrl + "/insert-user", user),

  updateUser: (user) => api.call("post", apiConfig.userManegmentUrl + "/update-user", user),

  deleteUser: (userId) => api.call("delete", `${apiConfig.userManegmentUrl}/delete-user?userId=${userId}`),

  saveUser: (insertMode, user) => {
    var action = insertMode ? "insert" : "update";
    var method = insertMode ? "post" : "put";
    return api.call(`${method}`, `${apiConfig.userManegmentUrl}/${action}-user`, user);
  },
};
