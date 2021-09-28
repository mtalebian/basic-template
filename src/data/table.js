//import * as bs from 'react-basic-design'
import { BasicSubject } from "../components/basic/event/basic-subject";

//Editors = label / textbox / number / select / checkbox / radio

export class Column {
    constructor({
        name,
        isPK,
        title,
        toggleOnClick,
        editor,
        validValues,
        cellStyle,
        cellClassName,
        fnFormat,
        hiddenInTable,
        hiddenInEditor,
        category,
        dir,
        ...rest
    }) {
        this.name = name;
        this.isPK = isPK;
        this.title = title;

        this.toggleOnClick = toggleOnClick;
        this.editor = editor;

        // [ { code: "1", title: "" }, ... ],
        // ["", "", ...],
        this.validValues = validValues;

        this.cellStyle = cellStyle;
        this.cellClassName = cellClassName;

        // ({ value }) => '# ' + value
        this.fnFormat = fnFormat;

        this.hiddenInTable = hiddenInTable;
        this.hiddenInEditor = hiddenInEditor;
        this.category = category;
        this.dir = dir;
        this.rest = rest;
    }
}

export class Table {
    constructor({ name, title, singularTitle, columns, sortable, filterable }) {
        this.name = name;
        this.title = title;
        this.singularTitle = singularTitle;
        this.sortable = sortable;
        this.filterable = filterable;
        this.columns = columns;
        this.data = new BasicSubject([], "table-" + name);
    }

    bind(fn, debugName) {
        return this.data.subscribe(fn, debugName);
    }

    getReactTableColumns = (categories) =>
        this.columns
            .filter((x) => !x.hiddenInTable && (!categories || categories.indexOf(x.category) >= 0))
            .map((x) => {
                var z = {
                    Header: x.title,
                    accessor: x.name,
                    _isSortable: x.sortable,
                    _toggleOnClick: x.toggleOnClick,
                    _isKey: x.isPK,
                    _editor: x.editor,
                    _dir: x.dir,
                    _cellProps: (row, cell) => ({ style: x.cellStyle, className: x.cellClassName }),
                };
                if (x.fnFormat) z.Cell = x.fnFormat;
                return z;
            });

    is = (name) => typeof name === "string" && name.toLowerCase() === this.name.toLowerCase();
}
