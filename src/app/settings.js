const rtl = false;

document.body.setAttribute("dir", rtl ? "rtl" : "ltr");
//document.body.classList.remove('rtl', 'ltr');
//document.body.classList.add(rtl ? 'rtl' : 'ltr');

export const settings = {
    rtl: rtl,
    projectId: "project1",
    title: "Project 1",
    supportTel: "+(98)9124147738",
};

export default settings;
