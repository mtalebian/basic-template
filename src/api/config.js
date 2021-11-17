const port = "5001";
const host = "https://localhost:" + port;

export const apiConfig = {
  localeUrl: host,
  //localeUrl: "",
  baseUrl: host,
  accountUrl: host + "/account",
  menuUrl: host + "/menu",
  gridBuilderUrl: host + "/gridBuilder",
  gridsUrl: host + "/grids",
  userUrl: host + "/User",
  roleUrl: host + "/Role",
};
