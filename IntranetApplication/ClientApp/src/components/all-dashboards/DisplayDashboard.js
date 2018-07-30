import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {withStyles} from "@material-ui/core/styles/index";

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
    },
    'appBar-left': {
        marginLeft: drawerWidth,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class DisplayDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('api/dashboards')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            );
    }

    render() {
        const { classes } = this.props;

        const {error, isLoaded, items = []} = this.state;
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div className={classes.root}>
                    <div className={classes.appFrame}>
                        <main className={classes.content}>
                            <div className={classes.toolbar} />
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>{items[0].name}</TableCell>
                                            <TableCell numeric>Dashboard Number</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {items.map(item => (
                                            <TableRow key={item.slideNum}>
                                                <TableCell component="th" scope="row">Slide {item.slideNum}</TableCell>
                                                <TableCell numeric>Dashboard {item.slideNum}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </main>
                    </div>
                </div>

            );
        }
    }
}

DisplayDashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DisplayDashboard);