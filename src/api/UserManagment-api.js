import { api } from "./api";
import { apiConfig } from "./config";

export const userManagmentApi = {
    getUser: (nationalCode) =>
    api.call(
        "post",
        `${apiConfig.userManegmentUrl}/UserInfo?nationalCode=${nationalCode}`
    ),

    insertUser: (data) =>
    api.call("post", apiConfig.userManegmentUrl + "/insert-user", data),

    updateUser: (data) =>
    api.call("post", apiConfig.userManegmentUrl + "/update-user", data),

    DeleteUser: (nationalCode) =>
    api.call("post",
    `${apiConfig.userManegmentUrl}/delete-user?nationalCode=${nationalCode}`
    ),
};
