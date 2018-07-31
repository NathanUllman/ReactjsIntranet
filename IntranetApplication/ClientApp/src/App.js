import React, { Component } from 'react';
import { Route, Redirect, Router, Switch } from 'react-router';
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
import { GET } from './Api/ApiCalls'
import Login from './components/Account/Login';
//import { updateAuth, LoggedInRoute, AdminRoute } from './components/Account/SecureRoutes';


class App extends Component {

    render() {

        return (

            <Layout onChange={updateAuth()}>
                    <Switch>
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
                    </Switch>
            </Layout>


        );

    }

    componentWillMount() {
        updateAuth();
    }
    componentDidUpdate() {
        updateAuth();
    }

}

export default App;




const Auth = { // variables used by functions
    isAdmin: false,
    isLoggedIn: true

}

function updateAuth() { // Update function called whenever a route changes
    updateIsAdmin();
    updateIsLoggedIn();
}

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.isAdmin ? ( // if user IsAdmin
                <Component {...props} /> // send them to their desired component
            ) : (
                    <Redirect
                        to={{
                            pathname: "/", // else, send home
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

const LoggedInRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            Auth.isLoggedIn ? ( // if, userIsLogged in
                <Component {...props} />
            ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: { from: props.location }
                        }}
                    />
                )
        }
    />
);

/* A couple functions which check to see if user is logged in or not */
function updateIsAdmin() {

    GET('api/get/currentUser/isAdmin',
        (response) => {
            if (response == 'true') {
                Auth.isAdmin = true;
            } else {
                Auth.isAdmin = false;
            }
        });
}

function updateIsLoggedIn() {
    GET('api/get/currentUser/isLoggedIn',
        (response) => {
            if (response == 'true') {
                Auth.isLoggedIn = true;
            } else {
                Auth.isLoggedIn = false;
            }
        });
}

