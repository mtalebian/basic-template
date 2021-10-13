import { api } from "./api";
import { apiConfig } from "./config";

export const userManagmentApi = {
    getUsers: () => api.call("get", `${apiConfig.userManegmentUrl}/users`),

    getUser: (nationalCode) => api.call("post", `${apiConfig.userManegmentUrl}/user-info?nationalCode=${nationalCode}`),

    insertUser: (user) => api.call("post", apiConfig.userManegmentUrl + "/insert-user", user),

    updateUser: (data) => api.call("post", apiConfig.userManegmentUrl + "/update-user", data),

    DeleteUser: (nationalCode) => api.call("post", `${apiConfig.userManegmentUrl}/delete-user?nationalCode=${nationalCode}`),
};
