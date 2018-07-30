import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Carousel from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
};

class NewHiresCarousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    componentDidMount() {
        fetch('api/newhires')
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
        const { classes } = this.props;
        const {error, isLoaded, items } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <Carousel
                    accessibility={false}
                    autoplay={false}
                    autoplaySpeed={4000}
                    arrows={true}
                >
                    {items.map(item => (
                        <Card key={item.name} className={classes.card}>
                            <CardMedia
                                className={classes.media}
                                image={`${item.image}`}
                                title="Logan"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="headline" component="h2">
                                    {item.name}
                                </Typography>
                                <Typography component="p">
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Carousel>
            );
        }
    }
}

NewHiresCarousel.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NewHiresCarousel);
