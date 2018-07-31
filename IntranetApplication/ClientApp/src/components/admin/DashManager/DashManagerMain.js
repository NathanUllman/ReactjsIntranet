import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DashSortableComponent from './DashSortableList';
import DashItemsSortableComponent from './DashItemsSortableList';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { POST, GET } from '../../../Api/ApiCalls'
import { NavLink } from 'react-router-dom';



import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';


class DashManager extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedId: -1,
            dashboards: [],
            dashboardItems: [],
            filteredDashboardItems: [],
            displayMessage: "",
            isAdmin: 'false'
        };
        this.handleDashSelected = this.handleDashSelected.bind(this);
        this.onSortEndDash = this.onSortEndDash.bind(this);
        this.onSortEndDashItems = this.onSortEndDashItems.bind(this);
    }

    componentDidMount() {

        // Nested so that GET requests are done in order and not async todo fix dis and make it more fancy

        GET("/api/get/dashboardItems", (response) => {
            this.setState({ dashboardItems: JSON.parse(response) });

            GET("/api/get/dashboards/filterByPriv/-1", (response) => {
                var dashboards = JSON.parse(response);
                this.setState({ dashboards: dashboards });

                if (dashboards.length > 0) { // set default selected
                    this.state.selectedId = dashboards[0].dashboardID;
                    this.handleDashSelected(dashboards[0].dashboardID);
                }
            });
        });

        GET("/api/get/currentUser/isAdmin",
            (response) => {
                console.log(response);
                this.setState({ isAdmin: response });
            });

    }



    handleDashSelected(id) {
        this.setState({ selectedId: id });

        // change what dash items are showed based on active ID
        var filterList = this.state.dashboardItems;
        filterList = filterList.filter(item => item.dashboardID === id); // filter so we only show Dash items for selected Dashboard
        this.setState({ filteredDashboardItems: filterList });
    }

    onSortEndDash(Index, e) {
        var dashboards = this.state.dashboards;
        this.setState({
            dashboards: arrayMove(dashboards, Index.oldIndex, Index.newIndex),
        });

        dashboards = this.state.dashboards;
        // sort order for each dashboard is updated after drag/drop
        var updatedOrder = [];
        dashboards.map((element) => {
            element.sortOrder = dashboards.indexOf(element);
            updatedOrder.push(element);
        });
        console.log(updatedOrder);
        this.setState({
            dashboards: updatedOrder
        });
    }

    onSortEndDashItems(Index, e) {
        var filteredList = this.state.filteredDashboardItems;
        this.setState({
            filteredDashboardItems: arrayMove(filteredList, Index.oldIndex, Index.newIndex),
        });

        filteredList = this.state.filteredDashboardItems;

        var updatedOrder = [];
        filteredList.map((element) => {
            element.sortOrder = filteredList.indexOf(element);
            updatedOrder.push(element);
        });

        this.setState({
            filteredDashboardItems: updatedOrder
        });
    }

    render() {
        var adminDashbuttons = "";
        if (this.state.isAdmin == 'true') {
            adminDashbuttons = <div>
                <NavLink to={{ pathname: "/InputForms/Dashboard" }} className="btn btn-primary">Add Dashboard</NavLink>
                <NavLink to={{ pathname: "/InputForms/Dashboard", state: { DashID: this.state.selectedId } }} className="btn btn-info">Edit Selected</NavLink>
                <a onClick={() => GET("/api/delete/dashboard/" + this.state.selectedId,
                    function() {window.location.href = "/DashManager"})} className="btn btn-danger">Delete Selected</a>
                <a className="btn btn-light" onClick={() => POST("/api/update/dashboards",
                    this.state.dashboards,
                    function () { this.setState({displayMessage: "Saved."}) })}>Save Order</a>
            </div>;
        }

        return (
            <div className="container-fluid">
                <br />
                <br />
                <h3>{this.state.displayMessage}</h3>
                <div className="row">
                    <div className="col-sm-4">

                        <div className="card">
                            <div className="card-header">
                                <h2>Dashboards</h2>
                            </div>
                            <div className="card-body">

                                <DashSortableComponent
                                    dashboards={this.state.dashboards}
                                    ItemSelectedHandler={this.handleDashSelected}
                                    activeId={this.state.selectedId}
                                    onSortEnd={this.onSortEndDash} />

                                {adminDashbuttons}

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">

                        <div className="card">
                            <div className="card-header">
                                <h2>Corresponding Dash Items</h2>
                            </div>
                            <div className="card-body">
                                <DashItemsSortableComponent
                                    dashboardItems={this.state.filteredDashboardItems}
                                    activeId={this.state.selectedId}
                                    onSortEnd={this.onSortEndDashItems}
                                />

                                <div aria-labelledby="dropdownMenuButton">
                                    Add    :
                                    <NavLink to={{ pathname: "/InputForms/TextOnly", state: { DashID: this.state.selectedId } }} className="btn btn-primary">Text</NavLink>
                                    <NavLink to={{ pathname: "/InputForms/ImageScrapped", state: { DashID: this.state.selectedId } }} className="btn btn-primary">Html scrapped Image</NavLink>
                                    <NavLink to={{ pathname: "/InputForms/ImageUploaded", state: { DashID: this.state.selectedId } }} className="btn btn-primary">Uploaded Image</NavLink>
                                </div>

                                <a className="btn btn-light" onClick={() => POST("/api/update/dashboardItems", this.state.filteredDashboardItems, function () { })}>Save Order</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  


}
export default DashManager