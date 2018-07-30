import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

class EditLink extends Component {
    /* Depending on what item the edit button is with, direct click to different spots */
    render() {
        var type = this.props.type;
        var id = this.props.DashItemID;

        if (type === 1) {
            return (
                <Button>
                    <NavLink to={{ pathname: "/InputForms/ImageScrapped", state: { DashItemID: id } }}>Edit</NavLink>
                </Button>
            );
        }
        if (type === 2) {
            return (
                <Button>
                    <NavLink to={{ pathname: "/InputForms/ImageUploaded", state: { DashItemID: id } }}>Edit</NavLink>
                </Button>
            );
        }

        if (type === 3) {
            return (
                <Button>
                    <NavLink to={{ pathname: "/InputForms/TextOnly", state: { DashItemID: id } }}>Edit</NavLink>
                </Button>
            );
        }
    }  
}

export default EditLink;