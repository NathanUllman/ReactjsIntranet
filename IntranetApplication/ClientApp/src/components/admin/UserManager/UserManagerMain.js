import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { POST, GET } from '../../../Api/ApiCalls'
import { NavLink } from 'react-router-dom';

class DashManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersList: [],
            message : ""
        }
        this.handleUserDelete = this.handleUserDelete.bind(this);
    }


    render() {

        var usersList = this.state.usersList;
        return (
            <div className="container">
                <br />
                <br />
                <div className="card">
                    <div className="card-header">
                        <h2>User List</h2>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <tbody>
                                <tr><th>User Name</th><th>Email</th><th>User Id</th><th></th><th></th></tr>
                                {usersList.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.userName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.id}</td>                              
                                        <td>
                                            <NavLink to={{ pathname: "/EditUser", state: {UserID : user.id} }} className="btn btn-info">Edit</NavLink>
                                        </td>
                                        <td>
                                            <a className="btn btn-danger" onClick={() => GET("/api/delete/user/" + user.id,(response) => this.handleUserDelete(response, user.id))}>Delete</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <NavLink to={{ pathname: "/AddUser" }} className="btn btn-primary">Add User</NavLink>
                        <h6>{this.state.message}</h6>
                    </div>
                </div>
            </div>


        );
    }


    componentWillMount() {

        GET("/api/get/users",
            (response) => {
                console.log(JSON.parse(response));
                this.setState({ usersList: JSON.parse(response) });
            });
    }

    handleUserDelete(response, id) {
        try {
            response = JSON.parse(response);
        } catch (e) {
            console.log(e);
        }
        
        if (response === "") { // no errors == success
            console.log("Delete successful");
            var list = this.state.usersList;
            list.forEach((elem,index) =>
                {
                if (elem.id === id) {
                    console.log("remove element");
                    list.splice(index, 1); // removes deleted item from list (so that we dont haved to refresh)
                    this.setState({ usersList: list }); // updates list
                }
                });
        } else { // errors == failure
            console.log("Delete not successful");
            this.setState({message: 'Errors for User Delete: ' + response});
        }

    }
}

export default DashManager;