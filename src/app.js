import React from "react";
import { Switch, Route } from "react-router-dom";

import { ThemeProvider } from "./app/theme-context";

/*
import BasicLayout from "./components/layout/basic-layout";
import Header from "./views/shared/header";
import Sidebar from "./views/shared/sidebar";

import AccountHeader from "./views/account/account-header";
import AccountFooter from "./views/account/account-footer";
import RegisterForm from "./views/account/register-form";
import LoginForm from "./views/account/login-form";
import ManageUsersForm from "./views/manage/manage-users-form";

import NotFound from "./views/shared/not-found";
import { AzRoute } from "./app/az-route";
import RoleForm from "./views/admin/role-form";



import ManageUsersForm from "./views/manage/manage-users-form";
*/
import { AzRoute } from "./app/az-route";
import { MenuApp } from "./views/admin/menu/menu-app";

import { LoginForm } from "./views/account/login-form";
import NotFound from "./views/shared/not-found";

import { DashboardApp } from "./views/home/dashboard/dashboard-app.js";
import { InboxApp } from "./views/home/inbox/inbox-app";
import { LunchpadApp } from "./views/home/lunchpad/lunchpad-app";
import StartupApp from "./views/home/startup/startup-app";
import { MainLayout } from "./views/shared/main-layout2";

import { TablesApp } from "./views/admin/grids/grids-app";
import { TableDesignerApp } from "./views/admin/grid-builder/grid-builder-app";
import { UserSettingsApp } from "./views/account/user-settings-app";
import { UsersApp } from "./views/admin/users/users-app";
import { FormikInput } from "./components/forms";
import * as bd2 from "./components/forms";
import SvgClose from "./assets/icons/Close";

export function App() {
    return (
        <ThemeProvider>
            <bd2.FormikForm initialValues={{ status: 1 }} onSubmit={(values) => alert("submited")} dense>
                <div className="p-5">
                    <div className="d-flex bg-shade-5 ">
                        <FormikInput className="m-3" label="text" name="status" width="12rem" />

                        <bd2.FormikInput
                            className="m-3"
                            label="custom menu"
                            name="status"
                            menu={[
                                { id: 10, title: "one" },
                                { id: 20, title: "tow" },
                                { id: 30, title: "three" },
                                { id: 40, title: "four" },
                                { id: 50, title: "five" },
                            ].map((x) => (
                                <div key={x.id} className="bd-dropdown-item d-flex " onclick={(e) => {}}>
                                    <span className="flex-grow-1">{x.title}</span>
                                    <SvgClose />
                                </div>
                            ))}
                            width="12rem"
                        />

                        <bd2.FormikInput
                            className="m-3"
                            label="array if {id, title}"
                            name="status"
                            menu={[
                                { id: 1, title: "one" },
                                { id: 2, title: "tow" },
                                { id: 3, title: "three" },
                                { id: 4, title: "four" },
                                { id: 5, title: "five" },
                            ]}
                            width="12rem"
                        />

                        <bd2.FormikInput className="m-3" label="array of numbers" name="status" menu={[1, 2, 3, 4, 5]} width="12rem" />
                        <bd2.FormikInput className="m-3" label="array of strings" name="status" menu={["1", "2", "3", "4"]} width="12rem" />
                        <bd2.FormikInput
                            className="m-3"
                            label="readOnly"
                            name="status"
                            menu={["1", "2", "3", "4"]}
                            width="12rem"
                            readOnly
                        />

                        <bd2.FormikInput
                            type="label"
                            className="m-3"
                            label="type = label"
                            name="status"
                            menu={["1", "2", "3", "4"]}
                            width="12rem"
                        />

                        <bd2.FormikInput
                            type="combobox"
                            className="m-3"
                            label="combobox"
                            name="status"
                            menu={["1", "2", "3", "4"]}
                            width="12rem"
                        />
                    </div>
                </div>
            </bd2.FormikForm>

            <Switch>
                <Route exact path="/" render={() => <StartupApp />} />

                <Route exact path="/login">
                    <main className="content h-100 middle text-secondary-text">
                        <LoginForm />
                    </main>
                </Route>

                <AzRoute exact path="/user/settings" render={() => <MainLayout component={UserSettingsApp} />} />

                <AzRoute exact path="/admin/menu" render={() => <MainLayout component={MenuApp} />} />

                <AzRoute exact path="/admin/table-designer" render={() => <MainLayout component={TableDesignerApp} />} />

                <AzRoute exact path="/admin/tables" render={() => <MainLayout component={TablesApp} />} />

                <AzRoute exact path="/admin/users" render={() => <MainLayout component={UsersApp} />} />

                <AzRoute exact path="/home" render={() => <MainLayout component={LunchpadApp} />} />

                <AzRoute exact path="/dashboard" render={() => <MainLayout component={DashboardApp} />} />

                <AzRoute exact path="/inbox" render={() => <MainLayout component={InboxApp} />} />

                <AzRoute render={() => <MainLayout component={NotFound} />} />
            </Switch>
        </ThemeProvider>
    );
}

/*
                <Route exact path="/admin/role" render={() => <Layout content={RoleForm} />} />

                <AzRoute exact path="/manage/users" render={() => <Layout content={ManageUsersForm} />} />

 
                <Route exact path="/account/login"><Layout layout="hmf" className="account account-light" header={AccountHeader} content={LoginForm} footer={AccountFooter} light /></Route>
                <Route exact path="/account/login2"><Layout layout="hmf" className="account account-dark" header={AccountHeader} content={LoginForm} footer={AccountFooter} dark /></Route>
                <Route exact path="/account/login3"><Layout layout="hmf" className="account account-dark with-background-image" header={AccountHeader} content={LoginForm} footer={AccountFooter} dark /></Route>

                <Route exact path="/account/register"><Layout layout="hmf" className="account account-light" header={AccountHeader} content={RegisterForm} footer={AccountFooter} light /></Route>
                <Route exact path="/account/register2"><Layout layout="hmf" className="account account-dark" header={AccountHeader} content={RegisterForm} footer={AccountFooter} dark /></Route>
                <Route exact path="/account/register3"><Layout layout="hmf" className="account account-dark with-background-image" header={AccountHeader} content={RegisterForm} footer={AccountFooter} dark /></Route>
 */
