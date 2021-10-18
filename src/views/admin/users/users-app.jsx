import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as bd from "react-basic-design";
import * as icons from "../../../assets/icons";
import { TableTitlebar } from "react-basic-design";
import { AddUser } from "./add-user";
import { Table } from "../../../components/table";
import { useAccount } from "../../../app/account-context";
import { userManagmentApi } from "../../../api/user-managment-api";
import { notify } from "../../../components/basic/notify";

export const UsersApp = ({ ...props }) => {
    const { t } = useTranslation();
    const [insertMode, setInsertMode] = useState(false);
    const account = useAccount();
    const [users, setUsers] = useState(null);
    const tableRef = React.useRef();
    const columns = React.useMemo(
        () => [
            { Header: t("id"), accessor: "id" },
            { Header: t("user-name"), accessor: "userName" },
            { Header: t("first-name"), accessor: "firstName" },
            { Header: t("last-name"), accessor: "lastName" },
            { Header: t("windows"), accessor: "windowsAuthenticate" },
            { Header: t("email"), accessor: "email" },
        ],
        []
    );

    const addUserOnClick = () => {
        setInsertMode(true);
    };

    useEffect(() => {
        //if (!users && account.isConnected()) {
        userManagmentApi
            .getUsers()
            .then((x) => {
                setUsers(x);
            })
            .catch((ex) => {
                notify.error(ex);
            });
        //}
    });

    return (
        <>
            {!insertMode && !users && <div className="middle d-flex h-100">L O D I N G . . .</div>}
            {!insertMode && users && (
                <>
                    <div className="border-bottom">
                        <bd.Toolbar className="container">
                            <bd.Button variant="text" onClick={addUserOnClick}>
                                <icons.PersonAddAlt className="size-lg" />
                            </bd.Button>

                            <bd.Button variant="text">
                                <icons.Person className="size-lg" />
                                {t("View user")}
                            </bd.Button>
                        </bd.Toolbar>
                    </div>
                    <div className="container">
                        National Code: <input />
                        <TableTitlebar title="Users" />
                        <Table
                            //className="w-100"
                            columns={columns}
                            //defaultColumn={defaultColumn}
                            data={users}
                            //updateData={updateMyData}
                            //skipReset={skipResetRef.current}
                            //enablePaging={enablePaging}
                            //enableGrouping={enableGrouping}
                            //enableSorting={enableSorting}
                            //showTableInfo={showTableInfo}
                            //showSummary={showSummary}
                            //showColumnFilter={showColumnFilter}
                            //hideColumns={}
                            //showFooter={showFooter}
                            //showPageSize={true}
                            //border=""
                            editable={false}
                            //clickAction="toggle"
                            //hideCheckbox={hideCheckbox}
                            //selectionMode="single"
                            //messages={messages}
                            tableRef={tableRef}
                            //tableClassName="w-100"
                            //
                            title="Columns"
                            expandableTitlebar={true}
                            showRowsCount={true}
                            titlebarSize="md"
                            titlebarColor="secondary"
                            //
                            defaultPageSize={5}
                            onStateChanged={(state) => {}}
                        />
                    </div>
                </>
            )}

            {insertMode && <AddUser onGoBack={() => setInsertMode(false)} />}
        </>
    );
};

UsersApp.Appbar = {
    title: "users",
};
