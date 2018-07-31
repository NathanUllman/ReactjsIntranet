import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { POST, GET } from '../../../Api/ApiCalls'
import { SetFormListener } from '../../InputForms/Tools';

class AddUserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",

            dashboards: []
        }
    }


    render() {
        var dashboards = this.state.dashboards
        return (
            <div className="container">
                <br />
                <br />
                <form method="post" action="/api/add/user">
                    <div className="row">
                        <div className="col-md-4">

                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input name="Email" type="text" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="Password" type="text" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} className="form-control" />
                            </div>
                            <button type="submit" className="btn btn-default">Register</button>

                        </div>
                        <div className="card">
                            <div className="card-header">
                                <h3>Pick Which Dashboards the User Can Edit.</h3>
                            </div>
                            <div className="card-body">
                                <table className="table">
                                    <tbody>
                                        <tr><th>Title</th><th>Status</th></tr>
                                        {dashboards.map((dash) => (
                                            <tr>
                                                <td>{dash.dashboardTitle}</td>
                                                <td>{dash.dashboardStatusID}</td>
                                                <td><input type="checkbox" name="DashPrivileges" value={dash.dashboardID} /></td> {/*submitting the form will put all checked box's values into a neat array names DashDrivileges*/}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

        );

    }

    componentWillMount() {
        SetFormListener();

        GET("/api/get/dashboards",
            (response) => {
                this.setState({ dashboards: JSON.parse(response) });
            });

    }

}

export default AddUserForm;