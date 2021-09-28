import { Column, Table } from "./table";

export const columns = new Table({
    name: "Columns",
    title: "Columns",
    singularTitle: "Column",
    columns: [
        new Column({
            isPK: true,
            name: "id",
            title: "Id",
            sortable: true,
            toggleOnClick: true,
            cellStyle: { cursor: "default" },
            cellClassName: "text-primary",
            dir: "ltr",
        }),

        new Column({
            name: "name",
            title: "Name",
            toggleOnClick: true,
            cellStyle: { cursor: "default" },
        }),

        new Column({
            name: "expression",
            title: "Expression",
            toggleOnClick: true,
            cellStyle: { cursor: "default" },
        }),

        new Column({ name: "alias", title: "Alias" }),

        new Column({ name: "title", title: "عنوان" }),

        new Column({ name: "isPK", title: "IsPK", editor: "checkbox" }),
        new Column({
            name: "isRequired",
            title: "IsRequired",
            editor: "checkbox",
        }),

        new Column({
            name: "defaultValue",
            title: "DefaultValue",
        }),

        new Column({
            name: "toggleOnClick",
            title: "ToggleOnClick",
            editor: "checkbox",
        }),

        new Column({
            name: "editor",
            title: "Editor",
            validValues: "label, select, checkbox, radio, url, email",
        }),

        new Column({
            name: "validValues",
            title: "ValidValues",
        }),

        new Column({
            name: "cellStyle",
            title: "CellStyle",
        }),

        new Column({
            name: "cellClassName",
            title: "CellClassName",
        }),

        new Column({
            name: "hiddenInTable",
            title: "HiddenInTable",
            editor: "checkbox",
        }),

        new Column({
            name: "hiddenInEditor",
            title: "HiddenInEditor",
            editor: "checkbox",
        }),

        new Column({
            name: "category",
            title: "Category",
        }),

        new Column({
            name: "dir",
            title: "Dir",
        }),
    ],
    sortable: true,
    filterable: true,
});
