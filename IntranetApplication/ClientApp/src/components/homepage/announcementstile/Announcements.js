import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import AnnouncementsList from './AnnouncementsList';

class Announcements extends React.Component {
    render() {

        return (
            <Card>
                <CardHeader title={"Announcements"}/>
                <Divider/>
                <CardContent>
                    <AnnouncementsList/>
                </CardContent>
            </Card>
        );
    }
}

export default Announcements;