import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const accountApi = {
  login: ({ userName, password, captcha }) =>
    api.directCall("post", apiConfig.accountUrl + "/login/" + settings.projectId, { userName, password, captcha }),

  userInfo: () => api.directCall("post", apiConfig.accountUrl + "/user-info/" + settings.projectId),

  profileInfo: () => api.directCall("get", apiConfig.accountUrl + "/profile-info/" + settings.projectId),

  updateUserProfile: (user) => api.directCall("put", apiConfig.accountUrl + "/update-user-profile", user),

  changePassword: (info) => api.directCall("put", apiConfig.accountUrl + "/change-password", info),

  logout: () => {
    api.directCall("post", apiConfig.accountUrl + "/logout");
  },

  refresh: () => api.refresh(settings.projectId),
};
