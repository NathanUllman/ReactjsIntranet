import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 200,
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
});

function AnnouncementsList(props) {
    const { classes } = props;

    return (
        <List className={classes.root} subheader={<li />}>
            {[0, 1, 2, 3, 4].map(sectionId => (
                <li key={`section-${sectionId}`} className={classes.listSection}>
                    <ul className={classes.ul}>
                        {[0, 1, 2].map(item => (
                            <ListItem key={`item-${sectionId}-${item}`}>
                                <ListItemText primary={`Item ${item}`} />
                            </ListItem>
                        ))}
                    </ul>
                </li>
            ))}
        </List>
    );
}

AnnouncementsList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnnouncementsList);
