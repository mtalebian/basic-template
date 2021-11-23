import { useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { TableTitlebar } from "../../../components/table";
import { EditUser } from "./edit-user";
import { useAccount } from "../../../app/account-context";
import { userApi } from "../../../api/user-api";
import { notify } from "../../../components/basic/notify";
import { RenderTableDiv } from "../../../components/table/render-table-div";
import { DefaultEditor } from "../../../components/table/editors";
import { useShell } from "../../shared/use-shell";
import {
    useTable,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useFilters,
    useGroupBy,
    useExpanded,
    useRowSelect,
    useFlexLayout,
    useResizeColumns,
} from "react-table";

export const UserApp = () => {
    const { t } = useTranslation();
    const [editMode, setEditMode] = useState(false);
    const account = useAccount();
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const shell = useShell();

    shell.setApp(t("users"));

    const defaultPageSize = 10;
    const skipReset = true;

    useEffect(() => {
        if (!users && account.isConnected()) {
            userApi
                .getUsers()
                .then((x) => {
                    setUsers(x);
                })
                .catch((ex) => {
                    notify.error(ex);
                });
        }
    });

    const tableApi = useTable(
        {
            initialState: { pageSize: defaultPageSize },
            defaultColumn: {
                Cell: DefaultEditor,
                minWidth: 30,
                disableGroupBy: true,
            },
            columns: useMemo(
                () => [
                    { Header: t("id"), accessor: "id", width: 50 },
                    { Header: t("user-name"), accessor: "userName", width: 100 },
                    { Header: t("first-name"), accessor: "firstName" },
                    { Header: t("last-name"), accessor: "lastName" },
                    { Header: t("national-code"), accessor: "nationalCode" },
                    { Header: t("authenticate"), accessor: "windowsAuthenticate", getDisplayValue: (value) => (value ? "ويندوز" : "فرم") },
                ],
                []
            ),
            data: useMemo(() => (users ? users : []), [users]),
            autoResetPage: !skipReset,
            autoResetFilters: !skipReset,
            autoResetSortBy: !skipReset,
            autoResetSelectedRows: !skipReset,
            autoResetGlobalFilter: !skipReset,
            disableMultiSort: false,
        },
        useGlobalFilter,
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        //useBlockLayout,
        useFlexLayout,
        useResizeColumns
        //(hooks) => reactTable.addSelectionColumns(hooks)
    );

    return (
        <>
            {!editMode && !users && <div className="middle d-flex h-100">L O D I N G . . .</div>}
            {!editMode && users && (
                <>
                    <div className="container">
                        <TableTitlebar
                            tableApi={tableApi}
                            hideSettings
                            title="Roles"
                            fixed
                            buttons={
                                <>
                                    <bd.Button
                                        variant="text"
                                        color="primary"
                                        disabled={!tableApi.selectedFlatRows.length}
                                        onClick={() => {
                                            const data = tableApi.selectedFlatRows[0].original;
                                            tableApi.selectedFlatRows.length && setSelectedUser(data.id);
                                            setEditMode(true);
                                        }}
                                    >
                                        <icons.Edit />
                                    </bd.Button>
                                    <bd.Button
                                        variant="text"
                                        color="primary"
                                        onClick={() => {
                                            setSelectedUser(null);
                                            setEditMode(true);
                                        }}
                                    >
                                        <icons.Add />
                                    </bd.Button>
                                </>
                            }
                        />
                        <RenderTableDiv
                            tableApi={tableApi}
                            resizable
                            singleSelect
                            hideCheckbox
                            hasSummary
                            showTableInfo
                            showPageSize
                            enablePaging
                            enableGrouping
                            enableSorting
                            clickAction="select"
                            className="nano-scroll border"
                            hover
                            hasWhitespace
                            stickyFooter
                        />
                    </div>
                </>
            )}
            {editMode && (
                <EditUser
                    userId={selectedUser}
                    onGoBack={(item) => {
                        setEditMode(false);
                        if (!!item && selectedUser == null) {
                            setUsers([...users, item]);
                            setSelectedUser(item.id);
                        } else if (!!item && selectedUser != null) {
                            const list = [...users];
                            const i = list.findIndex((x) => x.id === item.id);
                            list[i] = item;
                            setUsers(list);
                            setSelectedUser(item.id);
                        } else if (item === null) {
                            const newUsers = users.filter((x) => x.id !== selectedUser);
                            setUsers(newUsers);
                            setSelectedUser(null);
                        }
                    }}
                />
            )}
        </>
    );
};

UserApp.Appbar = {
    title: "users",
};
