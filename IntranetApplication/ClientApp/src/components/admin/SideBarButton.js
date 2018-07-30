import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

class SideBarButton extends Component {
    render() {
        return (
            <ListItem
                button
                key={this.props.key}
                teamname={this.props.teamname}
                id={this.props.id}
                onClick = {() => this.props.setcurrentteam(this.props.teamname)}
            >
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={this.props.teamname} />
            </ListItem>
        );
    }
}

export default SideBarButton;