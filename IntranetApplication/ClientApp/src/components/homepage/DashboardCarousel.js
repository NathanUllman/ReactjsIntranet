import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import DashboardImage from '../../images/Dashboard.png';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
});

class DashboardCarousel extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { classes } = this.props;
        const { value } = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange}>
                        <Tab label="Tooling" />
                        <Tab label="Autoload" />
                        <Tab label="XNet" href="#basic-tabs" />
                    </Tabs>
                </AppBar>
                <Paper>
                    <Carousel showThumbs={false} selectedItem={value}>
                        <div>
                            <img src={DashboardImage} alt={"Tooling Dashboard"}/>
                        </div>
                        <div>
                            <img src={DashboardImage} alt={"Autoload Dashboard"}/>
                        </div>
                        <div>
                            <img src={DashboardImage} alt={"Xnet Dashboard"}/>
                        </div>
                    </Carousel>
                </Paper>
            </div>
        );
    }
}

DashboardCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardCarousel);
