import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';

class SideBarMainContent extends Component {
    render() {
        return (
            <main className={this.props.classes.content}>
                <Typography> Current team is: {this.props.currentteam}</Typography>
            </main>
        );
    }
}

export default SideBarMainContent;