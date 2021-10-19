const port = "44356";
//const port = "5001";
const host = "https://localhost:" + port;

export const apiConfig = {
    localeUrl: host,
    //localeUrl: "",
    baseUrl: host,
    accountUrl: host + "/account",
    menuUrl: host + "/menu",
    tableDesignerUrl: host + "/TableDesigner",
    userManegmentUrl: host + "/userManagment",
};
