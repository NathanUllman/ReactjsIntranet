import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import SideBarButton from './SideBarButton';
import SideBarMainContent from './SideBarMainContent';
// import MoneyIcon from '@material-ui/icons/AttachMoney';
// import ToolIcon from '@material-ui/icons/Build';
// import AnalysisIcon from '@material-ui/icons/Assessment';
// import AutoloadIcon from '@material-ui/icons/Backup';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    appFrame: {
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            teams: [],
            currentTeam: 'Sales'
        };
        this.setCurrentTeam = this.setCurrentTeam.bind(this);
    }

    setCurrentTeam(teamname) {
        this.setState({currentTeam: teamname});
    }

    componentDidMount() {
        fetch('api/dashboards')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        teams: result,
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


        return (

            <div className={classes.root}>
                <div className={classes.appFrame}>
                    <Drawer
                        variant="permanent"
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        anchor={'left'}
                    >
                        <Divider />
                        <List>
                            {this.state.teams.map((team) => {
                                return (
                                    <SideBarButton key={team.id} teamname={team.name} setcurrentteam={this.setCurrentTeam} id={team.id}/>
                                )
                            })}
                        </List>
                    </Drawer>
                    <SideBarMainContent classes={classes} currentteam={this.state.currentTeam}/>
                </div>
            </div>


        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideBar);