import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom';
import React, { Component } from 'react';
import queryString from 'query-string';
import {SetFormListener} from '../InputForms/Tools';

class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (          
           <div className="container">
                <br />
                <br/>
                <div className="row">
                    <div className="col-md-4">
                        <form method="post" action="/api/Login" id="form">
                            
                            <h4>Use a local account to log in.</h4>
                            <hr />
                            <div className="form-group">
                                <label htmlFor="Email">Email</label>
                                <input name="Email" type="text" id="Email" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input name="Password" type="password" id="Password" className="form-control"/>
                            </div>
                            <div className="form-group">
                                <div className="form-check">
                                    <input name="RememberMe" type="checkbox" id="RememberMe" className="form-check-input" value ='true'/>
                                    <label className="form-check-label">Remember me?</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" type="submit">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>                                 
            );
    }

    componentDidMount() {
        SetFormListener();
        }

}

export default Login;