function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

export const settings = {
    debugMode: true,
    projectId: "project1",
    title: "Project 1",
    supportTel: "+(98)9124147738",

    missingTranslations: {},
    logMissings: () => console.log(JSON.stringify(settings.missingTranslations, null, 2)),

    getLanguageCode: () => getCookie("i18next"),
};

export default settings;
