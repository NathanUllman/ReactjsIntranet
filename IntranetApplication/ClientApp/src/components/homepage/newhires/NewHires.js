import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import NewHiresCarousel from './NewHiresCarousel';

class NewHires extends React.Component {


    render() {
        return (
            <Card>
                <CardHeader title={"New Hires"}/>
                <Divider/>
                <CardContent>
                    <NewHiresCarousel />
                </CardContent>
            </Card>
        );
    }
}

export default NewHires;