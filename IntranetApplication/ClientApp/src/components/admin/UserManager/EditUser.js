import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { POST, GET } from '../../../Api/ApiCalls'

class EditUserForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userID: '',
            message: '',

            dashboards_All: [],
            dashboards_HasPriv: [],
            dashboards_NoPriv: []
        }
        this.handleAddPriv = this.handleAddPriv.bind(this);
        this.handleRemovePriv = this.handleRemovePriv.bind(this);

        this.moveTo_HasPriv = this.moveTo_HasPriv.bind(this);
        this.moveTo_NoPriv = this.moveTo_NoPriv.bind(this);
    }

    render() {

        var dashboards_HasPriv = this.state.dashboards_HasPriv;
        var dashboards_NoPriv = this.state.dashboards_NoPriv;
        return (
            <div className="container">
                <br />
                <br />
                <div className="row">
                    <div className="col-md-6">

                        <div className="card">
                            <div className="card-header">
                                <h3>Dashboards User Can Edit</h3>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr><th>Title</th><th>Status</th><th></th></tr>
                                        {dashboards_HasPriv.map((dash) => (
                                            <tr key={dash.dashboardID}>
                                                <td>{dash.dashboardTitle}</td>
                                                <td>{dash.dashboardStatusID}</td>
                                                <td><button className="btn btn-danger" onClick={() => this.handleRemovePriv(dash.dashboardID)}>Remove Edit Abilty</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">

                        <div className="card">
                            <div className="card-header">
                                <h3>Dashboards User Cannot Edit</h3>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr><th>Title</th><th>Status</th><th></th></tr>
                                        {dashboards_NoPriv.map((dash) => (
                                            <tr key={dash.dashboardID}>
                                                <td>{dash.dashboardTitle}</td>
                                                <td>{dash.dashboardStatusID}</td>
                                                <td><button className="btn btn-primary" onClick={() => this.handleAddPriv(dash.dashboardID)}> Add Edit Ability</button></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>                  
                </div>
                <div className="row">
                    <p>{this.state.message}</p>
                </div>

            </div>

        );
    }

    handleAddPriv(dashID) { // moves item from 'User cannot Edit' to 'User can Edit'
        var userID = this.state.userID;

        POST("/api/add/user/dashPrivilege",
            { UserID: userID, DashID: dashID },
            (response) => {
                console.log(response);
                if (response == "") { // no errors
                    this.moveTo_HasPriv(dashID);
                } else {// errors
                    this.displayErrors(response);
                }
            });   
    }

    handleRemovePriv(dashID) { // moves item from 'User can Edit' to 'User cannot Edit'

        var userID = this.state.userID;

        POST("/api/delete/user/dashPrivilege",
            { UserID: userID, DashID: dashID }, // create model object that is excepted by api
            (response) => {
                console.log(response);
                if (response == "") { // no errors
                    this.moveTo_NoPriv(dashID);
                } else {// errors
                    console.log("no", response);
                    this.displayErrors(response);
                }
            });      
    }

    moveTo_HasPriv(dashID) {

        var dashboard_NoPriv = this.state.dashboards_NoPriv;
        var dashboard_HasPriv = this.state.dashboards_HasPriv;

        console.log("Add priv to id:", dashID);
        this.state.dashboards_NoPriv.forEach((elem, index) => {
            if (elem.dashboardID == dashID) { // find element we want to move

                var movedDash = dashboard_NoPriv.splice(index, 1); // cut that item from its current location
                dashboard_HasPriv = dashboard_HasPriv.concat(movedDash); // add it to other location

            }

        });

        this.setState({
            dashboards_NoPriv: dashboard_NoPriv,
            dashboards_HasPriv: dashboard_HasPriv
        });
    }

    moveTo_NoPriv(dashID) {
        var dashboard_NoPriv = this.state.dashboards_NoPriv;
        var dashboard_HasPriv = this.state.dashboards_HasPriv;

        console.log("Remove priv from id:", dashID);

        this.state.dashboards_HasPriv.forEach((elem, index) => {
            if (elem.dashboardID == dashID) {

                var movedDash = dashboard_HasPriv.splice(index, 1);
                dashboard_NoPriv = dashboard_NoPriv.concat(movedDash);

            }
        });

        this.setState({
            dashboards_NoPriv: dashboard_NoPriv,
            dashboards_HasPriv: dashboard_HasPriv
        });
    }

    displayErrors(errors) {
        this.setState({ message: "Error: " + JSON.parse(errors) });
    }



    componentDidMount() {
        var userID = this.props.location.state.UserID;
        if (userID == null) { // if this component hasnt been sent an id to use, redirect
            window.location.href = '/UserManager';
        } else {

            this.setState({ userID: userID });

            GET('/api/get/dashboards', // nesting GET's so that they happen in order
                (response) => {
                    var dashboards = JSON.parse(response);
                    this.setState({ dashboards_All: dashboards });

                    GET('/api/get/user/dashPrivileges/' + userID,
                        (response) => {
                            var idList = JSON.parse(response);

                            dashboards.forEach((elem) => {// sort dash depending on user privileges 
                                //   console.log(elem.dashboardID);
                                //   console.log(idList);
                                if (idList.includes(elem.dashboardID.toString())) {
                                    this.setState({ dashboard_HasPriv: this.state.dashboards_HasPriv.push(elem) });
                                } else {
                                    this.setState({ dashboard_NoPriv: this.state.dashboards_NoPriv.push(elem) });
                                }
                            });

                        });
                });
        }


    }

}



export default EditUserForm;
