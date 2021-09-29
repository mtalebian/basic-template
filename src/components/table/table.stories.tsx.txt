import React from "react";
import * as bd from "../index";
import { RootStory } from "../root.stories";
import makeData from "./makeData";
import { roundedMedian } from "./aggregators";
import { SelectEditor, TextEditor } from "./editors";
import {
    DefaultColumnFilter,
    filterGreaterThan,
    NumberRangeColumnFilter,
    //SelectColumnFilter,
    SliderColumnFilter,
} from "./filters";
import { Form } from "react-bootstrap";
import * as icons from "../icons";
import classNames from "classnames";
import { TableMessages } from "./messages";
import SvgAdd from "../icons/Add";
import SvgDelete from "../icons/Delete";

export default {
    title: "Basic Design/Table",
};

const messages: TableMessages = {
    showing: "نمایش {from} تا {to} از {total}",
    showingFiltered: "نمایش {from} تا {to} از {total} (فیلتر شده از {all} ردیف)",
    page: "صفحه {page} از {total}",
    gotoPage: "برو به صفحه",
};

const Template = () => {
    const [enablePaging, setEnablePaging] = React.useState(true);
    const [enableGrouping, setEnableGrouping] = React.useState(true);
    const [enableSorting, setEnableSorting] = React.useState(true);
    const [showTableInfo, setShowTableInfo] = React.useState(true);
    const [showSummary, setShowSummary] = React.useState(false);
    const [showColumnFilter, setShowColumnFilter] = React.useState(true);
    const [showColumns, setShowColumns] = React.useState(true);
    const [showFooter, setShowFooter] = React.useState(false);
    const [border, setBorder] = React.useState();
    const [editable, setEditable] = React.useState(false);
    const [clickAction, setClickAction] = React.useState();
    const [hideCheckbox, setHideCheckbox] = React.useState(false);
    const [selectionMode, setSelectionMode] = React.useState();
    const tableRef = React.useRef();
    const globalFilterRef = React.useRef();

    const col_first_name = {
        Header: "First Name",
        Footer: "First Name",
        accessor: "firstName",
        // Use a two-stage aggregator here to first
        // count the total rows being aggregated,
        // then sum any of those counts if they are
        // aggregated further
        aggregate: "count",
        Aggregated: ({ value }) => `${value} Names`,
        _summary: "count",
        _headerProps: (column) => ({ className: "bg-shade-30 text-danger", style: { minWidth: 150 } }),
        _cellProps: (row, cell) => {
            //console.log(row);
            return { className: classNames("bg-shade-3 text-shade-1", { "text-danger": row.values.age < 15 }) };
        },
        _breakPoint: "xl",
        _popinCss: "",
    };

    const col_last_name = {
        Header: "Last Name",
        Footer: "Last Name",
        accessor: "lastName",
        // Use our custom `fuzzyText` filter on this column
        filter: "fuzzyText",
        // Use another two-stage aggregator here to
        // first count the UNIQUE values from the rows
        // being aggregated, then sum those counts if
        // they are aggregated further
        aggregate: "uniqueCount",
        Aggregated: ({ value }) => `${value} Unique Names`,
        _headerProps: { style: { minWidth: 150 } },
        _breakPoint: "lg",
        _popinCss: "col-6",
    };

    const col_age = {
        Header: "Age",
        Footer: "Age",
        accessor: "age",
        Filter: SliderColumnFilter,
        filter: "equals",
        // Aggregate the average age of visitors
        aggregate: "average",
        Aggregated: ({ value }) => `${value} (avg)`,
        _cellProps: (row, cell) => ({
            className: classNames({
                "fw-bold text-danger": row.values.age < 15,
                "fw-bold bg-shade-5": row.values.age > 20,
            }),
        }),
        _breakPoint: "md",
        _popinCss: "col-6",
    };

    const col_visits = {
        Header: "Visits",
        Footer: "Visits",
        accessor: "visits",
        Filter: NumberRangeColumnFilter,
        filter: "between",
        // Aggregate the sum of all visits
        aggregate: "sum",
        Aggregated: ({ value }) => `${value} (total)`,
        _breakPoint: "sm",
    };

    const col_status = {
        Header: "Status",
        Footer: "Status",
        accessor: "status",
        //Filter: SelectColumnFilter,
        Cell: SelectEditor,
        filter: "includes",
        _validValues: [
            { id: "single", title: "SINGLE" },
            { id: "relationship", title: "RELATIONSHIP" },
            { id: "complicated", title: "COMPLICATED" },
        ],
    };

    const col_progress = {
        Header: "Profile Progress",
        Footer: "Profile Progress",
        accessor: "progress",
        Filter: SliderColumnFilter,
        filter: filterGreaterThan,
        // Use our custom roundedMedian aggregator
        aggregate: roundedMedian,
        Aggregated: ({ value }) => `${value} (med)`,
    };

    const col_name = { Header: "Name", Footer: "Name", columns: [col_first_name, col_last_name] };
    const col_info = { Header: "Info", Footer: "Info", columns: [col_age, col_visits, col_status, col_progress] };

    //const columns = React.useMemo(() => [col_name, col_info], []);
    const columns = React.useMemo(() => [col_first_name, col_last_name, col_age, col_visits, col_status, col_progress], []);

    const defaultColumn = React.useMemo(
        () => ({
            Filter: DefaultColumnFilter,
            Cell: TextEditor,
            _headerProps: { style: { minWidth: 200 } },
        }),
        []
    );

    const [data, setData] = React.useState(() => makeData(1000));
    const [originalData] = React.useState(data);

    const skipResetRef = React.useRef(false);

    const updateMyData = (rowIndex, columnId, value) => {
        skipResetRef.current = true;
        setData((old) =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...row,
                        [columnId]: value,
                    };
                }
                return row;
            })
        );
    };

    React.useEffect(() => {
        skipResetRef.current = false;
    }, [data]);

    const resetData = () => {
        // Don't reset the page when we do this
        skipResetRef.current = true;
        setData(originalData);
    };

    return (
        <RootStory>
            <bd.Toolbar size="sm" className="px-1">
                <span className="m-s-2 m-e-1">Selection:</span>
                <bd.Toggle model={hideCheckbox} setModel={setHideCheckbox} label="Hide Checkbox" color="primary" dense size="sm" />
                <span className="m-s-2 m-e-1">Click Action</span>
                <Form.Select value={clickAction} onChange={(e: any) => setClickAction(e.target.value)} size="sm">
                    <option value=""></option>
                    <option value="select">SELECT</option>
                    <option value="toggle">TOGGLE</option>
                </Form.Select>
                <span className="m-s-2 m-e-1">Selection Mode</span>
                <Form.Select value={selectionMode} onChange={(e: any) => setSelectionMode(e.target.value)} size="sm">
                    <option value=""></option>
                    <option value="single">SINGLE</option>
                    <option value="multiple">MULTIPLE</option>
                </Form.Select>
            </bd.Toolbar>

            <bd.Toolbar size="sm" className="px-1">
                <span className="m-s-2 m-e-1">Show:</span>
                <bd.Toggle dense color="primary" size="sm" model={showTableInfo} setModel={setShowTableInfo} label="Table Info" />
                <bd.Toggle dense color="primary" size="sm" model={showSummary} setModel={setShowSummary} label="Summary" />
                <bd.Toggle dense color="primary" size="sm" model={showColumnFilter} setModel={setShowColumnFilter} label="Column Filter" />
                <bd.Toggle dense color="primary" size="sm" model={showColumns} setModel={setShowColumns} label="Columns" />
                <bd.Toggle dense color="primary" size="sm" model={showFooter} setModel={setShowFooter} label="Footer" />
                <bd.Toggle dense color="primary" size="sm" model={editable} setModel={setEditable} label="Editable" />
            </bd.Toolbar>

            <bd.Toolbar size="sm" className="px-1">
                <bd.Button variant="icon" size="sm" color="primary" edge="start" onClick={resetData}>
                    <icons.Refresh />
                </bd.Button>
                <bd.Button
                    variant="text"
                    size="sm"
                    onClick={() => {
                        console.log(tableRef.current);
                    }}
                >
                    Log(tbaleApi)
                </bd.Button>
                <bd.Toggle dense color="primary" size="sm" model={enablePaging} setModel={setEnablePaging} label="paging" />
                <bd.Toggle dense color="primary" size="sm" model={enableGrouping} setModel={setEnableGrouping} label="Grouping" />
                <bd.Toggle dense color="primary" size="sm" model={enableSorting} setModel={setEnableSorting} label="Sorting" />
                <Form.Select value={border} onChange={(e: any) => setBorder(e.target.value)} size="sm">
                    <option value=""></option>
                    <option value="none">NONE</option>
                    <option value="full">FULL</option>
                    <option value="row">ROW</option>
                    <option value="table-row">TABLE ROW</option>
                </Form.Select>
                <div className="divider"></div>
            </bd.Toolbar>

            <bd.TableTitlebar
                title="My Table"
                tableRef={tableRef}
                expanded
                buttons={
                    <>
                        <bd.Button variant="icon" size="md">
                            <SvgAdd />
                        </bd.Button>
                        <bd.Button variant="icon" size="md">
                            <SvgDelete />
                        </bd.Button>
                    </>
                }
            >
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.</p>{" "}
            </bd.TableTitlebar>

            <bd.Table
                //className="w-100"
                columns={columns}
                defaultColumn={defaultColumn}
                data={data}
                updateData={updateMyData}
                skipReset={skipResetRef.current}
                enablePaging={enablePaging}
                enableGrouping={enableGrouping}
                enableSorting={enableSorting}
                showTableInfo={showTableInfo}
                showSummary={showSummary}
                showColumnFilter={showColumnFilter}
                showColumns={showColumns}
                showFooter={showFooter}
                showPageSize={true}
                border={border}
                editable={editable}
                clickAction={clickAction}
                hideCheckbox={hideCheckbox}
                selectionMode={selectionMode}
                messages={messages}
                tableRef={tableRef}
                tableClassName="w-100"
                //
                title="Table Name"
                expandableTitlebar={true}
                showRowsCount={true}
                titlebarSize="md"
                titlebarColor="secondary"
                //
                defaultPageSize={5}
                onStateChanged={(state) => {
                    console.log(state);
                }}
            />
        </RootStory>
    );
};

export const TableDemo = Template.bind({});
