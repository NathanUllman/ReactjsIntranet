import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import RecentSalesTable from './RecentSalesTable';

class RecentSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
    }

    componentDidMount() {
        fetch('api/recentsales')
            .then(response => response.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
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
        const { error, isLoaded, items = [] } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <Card>
                    <CardHeader title={"Recent Sales"}/>
                    <Divider/>
                    <CardContent>
                        <RecentSalesTable data={items}/>
                    </CardContent>
                </Card>

            );
        }
    }
}

export default RecentSales;