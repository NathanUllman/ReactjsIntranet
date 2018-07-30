import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import RecentActivityList from './RecentActivityList';

class RecentActivity extends React.Component {
    render() {

        return (
            <Card>
                <CardHeader title={"Recent Activity"}></CardHeader>
                <Divider/>
                <CardContent>
                    <RecentActivityList />
                </CardContent>
            </Card>
        );
    }
}

export default RecentActivity;