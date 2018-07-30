import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactQuill from 'react-quill';
import Delta from 'react-quill';

import { POST, GET } from '../../Api/ApiCalls';
import { CURRENT_DATE } from './Tools'

import { SetFormListener } from './Tools';



class TextOnlyInputForm extends Component {


    constructor(props) {
        super(props);
        this.state = {
            dashID: 0,
            dashItemID: 0,
            dashItemStatusID: 2,
            sortOrder : 0,
            title: '',
            startTime: CURRENT_DATE(),
            endTime: CURRENT_DATE(),

            displayText: ''
        }
       
    }


    render() {

        return (

            <div className="container">
                <br />
                <br />
                <form method="post" name="inputForm" action="/api/add/dashboardItem" encType="application/x-www-form-urlencoded">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header">
                                    <h3>Create Item</h3>
                                </div>
                                <div className="card-body">

                                    <div className="form-group">
                                        <input type="hidden" name="DashboardID" value={this.state.dashID}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="DashboardItemID" value={this.state.dashItemID}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="DashboardItemStatusID" value={this.state.dashItemStatusID}/>
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="DashboardTypeID" value="3" />
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="SortOrder" value={this.state.sortOrder} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="Title">Title</label>
                                        <input name="Title" type="text" className="form-control"
                                            value={this.state.title} onChange={(e) => this.setState({ title: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="StartTime">Start time</label>
                                        <input name="StartDateTime" type="datetime-local" className="form-control"
                                            value={this.state.startTime} onChange={(e) => this.setState({ startTime: e.target.value })} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="EndTime"> End time</label>
                                        <input name="EndDateTime" type="datetime-local" className="form-control"
                                            value={this.state.endTime} onChange={(e) => this.setState({ endTime: e.target.value })} required />
                                    </div>


                                    <div className="form-group">
                                        <button type="submit" onClick={this.handleSubmit} className="btn btn-default">Add/Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="form-group" style={{ backgroundColor: "#FFFFFF" }}>
                                <label>Display Text</label>
                                <input name="DisplayText" id="displayText" type="hidden" value={this.state.displayText} required />
                                <ReactQuill
                                    value={this.state.displayText}
                                    theme="snow"
                                    onChange={(value) => this.setState({ displayText : value})}
                                    modules={{
                                        toolbar: [
                                            [{ 'header': [1, 2, false] }],
                                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                            ['link', 'image'],
                                            ['clean']
                                        ],
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }


    componentDidMount() {

        SetFormListener();

        var DashID = this.props.location.state.DashID;
        var DashItemID = this.props.location.state.DashItemID;

        // use of component depends on the props
        if (DashID != null) {

            this.setState({ dashID: DashID });
        }
        else if (DashItemID != null) {

            GET("/api/get/dashboardItem/" + DashItemID, // get item to edit
                (response) => {

                    var item = JSON.parse(response);
                    if (item.dashboardTypeID !== 3) { console.log("hella error") } // this form is not for this type

                    // prepopulate input form
                    this.setState({
                        dashID: item.dashboardID,
                        dashItemID: item.dashboardItemID,
                        dashItemStatusID: item.dashboardItemStatusID,
                        sortOrder: item.sortOrder,

                        title: item.title,
                        startTime: item.startDateTime,
                        endTime: item.endDateTime,
                        displayText:  item.dislayText
                    });     

                });
        }
        else {
            console.log("Error");
        }

    }

}
export default TextOnlyInputForm