import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { POST, GET } from '../../Api/ApiCalls';
import { SetFormListener } from './Tools';

class DashboardInputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dashID: 0,
            dashTitle: "",
            sortOrder: 0,
            dashStatusID: 1,

            usersList: []

        }
    }


    render() {
        var usersList = this.state.usersList;
        //todo convert this bad boi to react
        return (
            <div className="container">
                <br />
                <br />
                <form method="post" action="/api/add/dashboard/WithPriv">
                <div className="row">                
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Create Dashboard</h5>
                                </div>
                                <div className="card-body">


                                    <hr />
                                    <div className="form-group">
                                        <input type="hidden" name="DashboardID" value={this.state.dashID} />
                                        <input type="hidden" name="SortOrder" value={this.state.sortOrder} />
                                        <input type="hidden" name="DashboardStatusID" value={this.state.dashStatusID} />
                                    </div>

                                    <div className="form-group">
                                        <label>Dashboard Title</label>
                                        <input name="DashboardTitle" type="text" className="form-control"
                                            value={this.state.dashTitle} onChange={(e) => this.setState({ dashTitle: e.target.value })} />
                                    </div>

                                    <div className="form-group">
                                        <button type="submit" className="btn btn-default">Add/Save</button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Pick Who Can Edit this Dashboard</h5>
                                </div>
                                <div className="card-body">
                                    <table className="table">
                                        <tbody>
                                            <tr><th>User Name</th><th>Email</th><th>Can Edit</th></tr>
                                            {usersList.map((user) => (                                            
                                                <tr key={user.id}>
                                                    <td>{user.userName}</td>
                                                    <td>{user.email}</td>                                            
                                                    <td><input type="checkbox" name="usersWhoCanEdit" value={user.id} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>                 
                    </div>
                </form>
            </div>
        );
    }

    componentDidMount() {

        SetFormListener();

        if (this.props.location.state != null) { // first check to see if the state even exists
            var DashID = this.props.location.state.DashID;

            if (DashID != null) { // we are editing a pre-existing dashboard
                GET("api/get/dashboard/" + DashID,
                    (response) => {
                        var item = JSON.parse(response);
                        console.log(item);
                        this.setState({
                            dashID: item.dashboardID,
                            dashTitle: item.dashboardTitle,
                            sortOrder: item.sortOrder,
                            dashStatusID: item.dashboardStatusID
                        });

                        GET("/api/get/users",
                            (response) => {
                                console.log(JSON.parse(response));
                                this.setState({ usersList: JSON.parse(response) });
                            });


                    });
            }
        }

    }

}

export default DashboardInputForm;