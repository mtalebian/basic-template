import settings from "../app/settings";
import { api } from "./api";
import { apiConfig } from "./config";

export const accountApi = {
  login: ({ userName, password, captcha }) =>
    api.directCall("post", apiConfig.accountUrl + "/login/" + settings.projectId, { userName, password, captcha }),

  userInfo: () => api.directCall("post", apiConfig.accountUrl + "/user-info/" + settings.projectId),

  profileInfo: () => api.call("get", apiConfig.accountUrl + "/profile-info/" + settings.projectId),

  updateUserProfile: (user) => api.call("put", apiConfig.accountUrl + "/update-user-profile", user),

  changePassword: (info) => api.call("put", apiConfig.accountUrl + "/change-password", info),

  forgotPassword: ({ userName, captcha }) =>
    api.directCall("post", apiConfig.accountUrl + "/forgot-password/" + settings.projectId, { userName, captcha }),

  resetPassword: ({ userName, code, key }) =>
    api.directCall("post", apiConfig.accountUrl + "/reset-password/" + settings.projectId, { userName, code, key }),

  getActiveSessions: () => api.call("get", apiConfig.accountUrl + "/active-sessions/" + settings.projectId),

  terminateOtherUserSession: (sessions) => api.call("delete", apiConfig.accountUrl + "/terminate-sessions/" + settings.projectId, sessions),

  logout: () => {
    api.directCall("post", apiConfig.accountUrl + "/logout");
  },

  refresh: () => api.refresh(settings.projectId),
};
