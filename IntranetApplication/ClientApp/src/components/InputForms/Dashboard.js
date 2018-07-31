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
        this.addCheckedBoxes = this.addCheckedBoxes.bind(this);
        this.handleClick = this.handleClick.bind(this);
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
                                                    <td><input type="checkbox" name="usersWhoCanEdit" value={user.id} checked={user.IsChecked} onClick={(e) => this.handleClick(e)} /></td>
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

    handleClick(e) { // need to manual go to our state and check/uncheck things since it is a controlled react form
        var id = e.target.value;
        var users = this.state.usersList;

        var index = users.findIndex((elem) => {
            return elem.id === id; // find which user checkbox was selected            
        });

        var selectedUser = users.splice(index, 1)[0]; // removes selected element, returns an array so we need [0] to get the object

        selectedUser.IsChecked = !(selectedUser.IsChecked); // toggle
        users.splice(index, 0,  selectedUser );
        this.setState({ usersList: users });


    }


    addCheckedBoxes(users, usersWhoCanEdit) { // add an IsChecked = true for each user in the list that can edit the dashboard
        var newList = [];
        users.forEach((user) => {
            if (usersWhoCanEdit.includes(user.id)) {
                user.IsChecked = true;
            } else {
                user.IsChecked = false;
            }
            newList.push(user);
        });
        this.setState({ usersList: newList });
    }



    componentDidMount() {

        SetFormListener();

        GET("/api/get/users",
            (response) => {
                var users = JSON.parse(response);
                this.setState({ usersList: users });

                try { // will fail if we are creating a brand new item/dashID is null 
                    GET("/api/get/user/withPrivilege/" + this.props.location.state.DashID,
                        (response) => {
                            var usersWhoCanEdit = JSON.parse(response);
                            this.addCheckedBoxes(users, usersWhoCanEdit);
                        });
                } catch (e) {
                }
            });

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
                    });
            }
        }

    }

}

export default DashboardInputForm;