import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
});

function RecentSales(props) {
    const { classes, data } = props;

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Vendor</TableCell>
                        <TableCell>Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(n => {
                        return (
                            <TableRow key={n.id}>
                                <TableCell component="th" scope="row">
                                    {n.name}
                                </TableCell>
                                <TableCell>{n.amount}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Paper>
    );
}

RecentSales.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecentSales);
