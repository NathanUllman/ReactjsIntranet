import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import { GET } from '../../Api/ApiCalls'




const Auth = { // variables used by functions
    isAdmin: false,
    isLoggedIn: false

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

