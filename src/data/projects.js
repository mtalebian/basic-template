import { Column, Table } from "./table";

export const projects = new Table({
    name: "Applications",
    title: "سیستم ها",
    singularTitle: "سیستم",
    columns: [
        new Column({
            isPK: true,
            name: "id",
            title: "شناسه",
            sortable: true,
            toggleOnClick: true,
            cellStyle: { cursor: "default" },
            cellClassName: "text-primary",
            dir: "ltr",
        }),

        new Column({
            name: "title",
            title: "عنوان",
            toggleOnClick: true,
            cellStyle: { cursor: "default" },
        }),
    ],
    sortable: true,
    filterable: true,
});
