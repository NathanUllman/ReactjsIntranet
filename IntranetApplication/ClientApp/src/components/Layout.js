import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({

    palette: {
        primary: {
            main: '#24465E'
        },
        secondary: {
            main: '#00A7E5'
        },
    },
});

export default props => (
    <MuiThemeProvider theme={theme}>
        <Grid>
            <NavBar/>
            {props.children}
        </Grid>
    </MuiThemeProvider>
);