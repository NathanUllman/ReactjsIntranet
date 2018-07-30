import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
//import AdminPage from './components/admin/AdminPage';
import DashManager from './components/admin/DashManager/DashManagerMain';
import UserManager from './components/admin/UserManager/UserManagerMain'
import EditUserForm from './components/admin/UserManager/EditUser';
import AddUserForm from './components/admin/UserManager/AddUser';

import TextOnlyInputForm from './components/InputForms/TextOnly';
import ImageScrappedInputForm from './components/InputForms/ImageScrapped';
import ImageUploadedInputForm from './components/InputForms/ImageUploaded';
import DashboardInputForm from './components/InputForms/Dashboard';

import Login from './components/Account/Login';
import { updateAuth, LoggedInRoute, AdminRoute } from './components/Account/SecureRoutes';

export default () => (
    <Layout onChange={updateAuth()}>

        {/*Public componenets anyone can access*/}
        <Route exact path='/' component={HomePage} />
        <Route path='/Account/Login' component={Login} />

        {/*Routes only for admins*/}
        <AdminRoute path='/UserManager' component={UserManager} />
        <AdminRoute path='/EditUser' component={EditUserForm} />
        <AdminRoute path='/AddUser' component={AddUserForm} />

        {/*Routes for anyone who is logged in*/}
        <LoggedInRoute path='/DashManager' component={DashManager} />
        <LoggedInRoute path='/InputForms/TextOnly' component={TextOnlyInputForm} />
        <LoggedInRoute path='/InputForms/ImageScrapped' component={ImageScrappedInputForm} />
        <LoggedInRoute path='/InputForms/ImageUploaded' component={ImageUploadedInputForm} />
        <LoggedInRoute path='/InputForms/Dashboard' component={DashboardInputForm} />

    </Layout>
);


