import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
//import DashboardCarousel from './tiles/DashboardCarousel';
//import RecipeReviewCard from './RecipeReviewCard';
import RecentActivity from './homepage/recentactivitytile/RecentActivity';
import NewHires from './homepage/newhires/NewHires';
import RecentSales from './homepage/recentsalestile/RecentSales';
import CarouselTabs from './homepage/DashboardCarousel';
import Announcements from './homepage/announcementstile/Announcements';


const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        height: '100%',
        color: theme.palette.text.secondary,
    },
    card: {
        minHeight: 400,
    },
});

function HomePage (props) {
    const {classes} = props;

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12}>
                <Grid
                    container
                    spacing={16}
                    direction={"row"}
                    justify={"center"}
                >
                    <Grid item xs={2}>
                        <Grid
                            container
                            direction={"column"}
                            spacing={16}
                        >
                            <Grid item>
                                <RecentSales/>
                            </Grid>
                            <Grid item>
                                <RecentActivity/>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid
                            container
                            direction={"column"}
                            spacing={16}
                        >
                            <Grid item>
                                <Paper className={classes.paper}>
                                    <CarouselTabs/>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid
                            container
                            direction={"column"}
                            spacing={16}
                        >
                            <Grid item>
                                <NewHires/>
                            </Grid>
                            <Grid item>
                                <Announcements className={classes.card}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);