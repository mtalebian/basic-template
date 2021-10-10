import { api } from "./api";
import { apiConfig } from "./config";

export const userManagmentApi = {
    getUsers: (nationalCode) => api.call("post", `${apiConfig.userManegmentUrl}/get-users`),

    getUser: (nationalCode) => api.call("post", `${apiConfig.userManegmentUrl}/UserInfo?nationalCode=${nationalCode}`),

    insertUser: (user) => api.call("post", apiConfig.userManegmentUrl + "/insert-user", user),

    updateUser: (data) => api.call("post", apiConfig.userManegmentUrl + "/update-user", data),

    DeleteUser: (nationalCode) => api.call("post", `${apiConfig.userManegmentUrl}/delete-user?nationalCode=${nationalCode}`),
};
