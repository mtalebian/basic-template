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
import { ForgotPassword } from "./views/account/forgot-password";
import NotFound from "./views/shared/not-found";

import { DashboardApp } from "./views/home/dashboard/dashboard-app.js";
import { InboxApp } from "./views/home/inbox/inbox-app";
import { LunchpadApp } from "./views/home/lunchpad/lunchpad-app";
import StartupApp from "./views/home/startup/startup-app";
import { MainLayout } from "./views/shared/main-layout2";

import { GridsApp } from "./views/admin/grids/grids-app";
import { GridBuilderApp } from "./views/admin/grid-builder/grid-builder-app";
import { UserSettingsApp } from "./views/account/user-settings-app";
import { UserApp } from "./views/admin/users/user-app";
import { RoleApp } from "./views/admin/roles/role-app";
import { CompositeRoleApp } from "./views/admin/composite-roles/composite-role-app";
import { UserProfile } from "./views/account/user-profile";
import { ActiveSessions } from "./views/account/active-sessions";
import { FormikTest } from "./components/forms/formik-test";
import { GridTest } from "./components/grid/grid-test";
import { GridApp } from "./views/admin/grid/grid-app";

export function App() {
  return (
    <ThemeProvider>
      <Switch>
        <Route exact path="/test-form" render={() => <MainLayout component={FormikTest} />} />
        <AzRoute exact path="/test-grid" render={() => <MainLayout component={GridTest} />} />

        <Route exact path="/" render={() => <StartupApp />} />

        <Route exact path="/login">
          <main className="content h-100 middle text-secondary-text">
            <LoginForm />
          </main>
        </Route>

        <Route exact path="/account/forgot-password">
          <main className="content h-100 middle text-secondary-text">
            <ForgotPassword />
          </main>
        </Route>

        <AzRoute exact path="/user/settings" render={() => <MainLayout component={UserSettingsApp} />} />

        <AzRoute exact path="/account/user-profile" render={() => <MainLayout component={UserProfile} />} />
        <AzRoute exact path="/account/active-sessions" render={() => <MainLayout component={ActiveSessions} />} />

        <AzRoute exact path="/admin/menu" render={() => <MainLayout component={MenuApp} />} />

        <AzRoute exact path="/admin/grid-builder" render={() => <MainLayout component={GridBuilderApp} />} />
        <AzRoute exact path="/admin/grids" render={() => <MainLayout component={GridsApp} />} />
        <AzRoute exact path="/admin/grid" render={() => <MainLayout component={GridApp} />} />

        <AzRoute exact path="/admin/users" render={() => <MainLayout component={UserApp} />} />

        <AzRoute exact path="/admin/roles" render={() => <MainLayout component={RoleApp} />} />

        <AzRoute exact path="/admin/composite-roles" render={() => <MainLayout component={CompositeRoleApp} />} />

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
