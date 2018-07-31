import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { GET } from '../Api/ApiCalls'

const styles = theme => ({
    button: {
        color: 'white'
    },
});

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: 'false',
            isAdmin: 'false'
        };
        this.logoutUser = this.logoutUser.bind(this);
    }


    render() {
        const { classes } = this.props;

        var DependentTabs;
        if (this.state.isAdmin == 'true') {
            DependentTabs = (
                <div>
                    <Button color="inherit">
                        <NavLink className={classes.button} to={"/DashManager"}>Dash Manager</NavLink>
                    </Button>
                    <Button color="inherit">
                        <NavLink className={classes.button} to={"/UserManager"}>User Manager</NavLink>
                    </Button>
                    <Button color="inherit">
                        <a className={classes.button} onClick={() => this.logoutUser()}>Logout Admin</a>
                    </Button>
                </div>);

        } else if (this.state.isLoggedIn == 'true') {
            DependentTabs = (
                <div>
                    <Button color="inherit">
                        <NavLink className={classes.button} to={"/DashManager"}>Dash Manager</NavLink>
                    </Button>
                    <Button color="inherit">
                        <a className={classes.button} onClick={() => this.logoutUser()}>Logout</a>
                    </Button>
                </div>);

        } else {
            DependentTabs = (<Button color="inherit">
                <NavLink className={classes.button} to={"/Account/Login"}>Login</NavLink>
            </Button>);
        }

        return (
            <AppBar position="static">
                <Toolbar>
                    <Button>
                        <NavLink className={classes.button} to={"/"}>Home</NavLink>
                    </Button>
                    {DependentTabs}
                </Toolbar>
            </AppBar>
        );
    }

    logoutUser() {
        GET('/api/logout',
            () => {
                this.setState(
                    {
                        isLoggedIn: false,
                        isAdmin : false
                    });
               window.location.href = '/'; 
            });
    }

    componentDidMount() {
        GET('/api/get/currentUser/isLoggedIn',
            (response) => {
                this.setState({ isLoggedIn: response });
            });
        GET('/api/get/currentUser/isAdmin',
            (response) => {
                this.setState({ isAdmin: response });
            });

    }
}



NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);