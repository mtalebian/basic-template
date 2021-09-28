import React from "react";
import * as bs from "react-basic-design";

import { BasicTable } from "./basic-table";
import makeData from "./makeData";
import {
    DefaultColumnFilter,
    filterGreaterThan,
    NumberRangeColumnFilter,
    SelectColumnFilter,
    SliderColumnFilter,
} from "./basic-table-filters";
import { roundedMedian } from "./basic-table-aggregators";
import { BTSelectEditor, BTTextEditor } from "./basic-table-editors";

export function TestTableApp() {
    const [enablePaging, setEnablePaging] = React.useState(true);
    const [showTableInfo, setShowTableInfo] = React.useState(true);
    const [showSummary, setShowSummary] = React.useState(true);
    const [showFooter, setShowFooter] = React.useState(true);

    const columns = React.useMemo(
        () => [
            {
                Header: "Name",
                Footer: "Name",
                columns: [
                    {
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
                    },
                    {
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
                    },
                ],
            },
            {
                Header: "Info",
                Footer: "Info",
                columns: [
                    {
                        Header: "Age",
                        Footer: "Age",
                        accessor: "age",
                        Filter: SliderColumnFilter,
                        filter: "equals",
                        // Aggregate the average age of visitors
                        aggregate: "average",
                        Aggregated: ({ value }) => `${value} (avg)`,
                    },
                    {
                        Header: "Visits",
                        Footer: "Visits",
                        accessor: "visits",
                        Filter: NumberRangeColumnFilter,
                        filter: "between",
                        // Aggregate the sum of all visits
                        aggregate: "sum",
                        Aggregated: ({ value }) => `${value} (total)`,
                    },
                    {
                        Header: "Status",
                        Footer: "Status",
                        accessor: "status",
                        Filter: SelectColumnFilter,
                        Cell: BTSelectEditor,
                        filter: "includes",
                        _validValues: [
                            { id: "single", title: "SINGLE" },
                            { id: "relationship", title: "RELATIONSHIP" },
                            { id: "complicated", title: "COMPLICATED" },
                        ],
                    },
                    {
                        Header: "Profile Progress",
                        Footer: "Profile Progress",
                        accessor: "progress",
                        Filter: SliderColumnFilter,
                        filter: filterGreaterThan,
                        // Use our custom roundedMedian aggregator
                        aggregate: roundedMedian,
                        Aggregated: ({ value }) => `${value} (med)`,
                    },
                ],
            },
        ],
        []
    );

    const defaultColumn = React.useMemo(() => ({ Filter: DefaultColumnFilter, Cell: BTTextEditor }), []);

    const [data, setData] = React.useState(() => makeData(1000));
    const [originalData] = React.useState(data);

    // We need to keep the table from resetting the pageIndex when we
    // Update data. So we can keep track of that flag with a ref.
    const skipResetRef = React.useRef(false);

    // When our cell renderer calls updateMyData, we'll use
    // the rowIndex, columnId and new value to update the
    // original data
    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
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

    // After data changes, we turn the flag back off
    // so that if data actually changes when we're not
    // editing it, the page is reset
    React.useEffect(() => {
        skipResetRef.current = false;
    }, [data]);

    // Let's add a data resetter/randomizer to help
    // illustrate that flow...
    const resetData = () => {
        // Don't reset the page when we do this
        skipResetRef.current = true;
        setData(originalData);
    };

    return (
        <div className="p-3">
            <bs.Toolbar gap={2} size="md">
                <bs.Button color="primary" onClick={resetData}>
                    Reset Data
                </bs.Button>
                <label>
                    <bs.Toggle color="primary" size="sm" model={enablePaging} setModel={setEnablePaging}></bs.Toggle>
                    Enable paging
                </label>
                <label>
                    <bs.Toggle color="primary" size="sm" model={showTableInfo} setModel={setShowTableInfo}></bs.Toggle>
                    Show Table Info
                </label>
                <label>
                    <bs.Toggle color="primary" size="sm" model={showSummary} setModel={setShowSummary}></bs.Toggle>
                    Show Summary
                </label>
                <label>
                    <bs.Toggle color="primary" size="sm" model={showFooter} setModel={setShowFooter}></bs.Toggle>
                    Show Footer
                </label>
            </bs.Toolbar>

            <BasicTable
                columns={columns}
                defaultColumn={defaultColumn}
                data={data}
                updateData={updateMyData}
                skipReset={skipResetRef.current}
                enablePaging={enablePaging}
                showTableInfo={showTableInfo}
                showSummary={showSummary}
                showFooter={showFooter}
                showPageSize={true}
            />
        </div>
    );
}
