import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import { POST, GET } from '../../Api/ApiCalls'
import { CURRENT_DATE } from './Tools'
import $ from 'jquery';
import { SetFormListener } from './Tools';

class ImageScrappedInputForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dashID: 0,
            dashItemID: 0,
            dashItemStatusID: 2,
            sortOrder: 0,
            title: '',
            startTime: CURRENT_DATE(),
            endTime: CURRENT_DATE(),

            imageURI: '',
            clickThruURL: '',

            sourceURL: '',
            cssSelector: '',
            logonUser: '',
            logonPwd: '',

            testMessage: ''
        }

        this.TestScrapping = this.TestScrapping.bind(this);
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
                                        <input type="hidden" name="DashboardID" value={this.state.dashID} />
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="DashboardItemID" value={this.state.dashItemID} />
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="DashboardItemStatusID" value={this.state
                                            .dashItemStatusID} />
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="DashboardTypeID" value="1" />
                                    </div>
                                    <div className="form-group">
                                        <input type="hidden" name="SortOrder" value={this.state.sortOrder} />
                                    </div>


                                    <div className="form-group">
                                        <label htmlFor="Title">Title</label>
                                        <input name="Title" type="text" className="form-control"
                                            value={this.state.title} onChange={(e) => this.setState({
                                                title: e.target.value
                                            })} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="StartTime">Start time</label>
                                        <input name="StartDateTime" type="datetime-local" className="form-control"
                                            value={this.state.startTime} onChange={(e) => this.setState({
                                                startTime: e.target.value
                                            })} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="EndTime"> End time</label>
                                        <input name="EndDateTime" type="datetime-local" className="form-control"
                                            value={this.state.endTime} onChange={(e) => this.setState({
                                                endTime: e.target.value
                                            })} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ClickThruURL">Click Thru URL</label>
                                        <input name="ClickThruURL" type="text" className="form-control"
                                            value={this.state.clickThruURL} onChange={(e) => this.setState({
                                                clickThruURL: e.target.value
                                            })} required />
                                    </div>


                                    <div className="form-group">
                                        <button type="submit" className="btn btn-default">Add/Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">

                            <div id="HtmlScrappingInput">
                                <img id="preview" src={this.state.imageURI} alt="preview image" accept="image/*" />
                                <input type="hidden" value={this.state.imageURI} name="ImageURI" />

                                <div className="form-group">
                                    <label>Source Url</label>
                                    <input name="SourceURL" type="text" className="form-control"
                                        value={this.state.sourceURL} onChange={(e) => this.setState({
                                            sourceURL: e.target.value
                                        })} required />
                                </div>
                                <div className="form-group">
                                    <label>Css Selector</label>
                                    <input name="CssSelector" type="text" className="form-control"
                                        value={this.state.cssSelector} onChange={(e) => this.setState({
                                            cssSelector: e.target.value
                                        })} required />
                                </div>
                                <div className="form-group">
                                    <label>User Name To use</label>
                                    <input name="LogonUser" type="text" className="form-control"
                                        value={this.state.logonUser} onChange={(e) => this.setState({
                                            logonUser: e.target.value
                                        })} required />
                                </div>
                                <div className="form-group">
                                    <label>Password to Use</label>
                                    <input name="LogonPwd" type="text" className="form-control"
                                        value={this.state.logonPwd} onChange={(e) => this.setState({
                                            logonPwd: e.target.value
                                        })} required />
                                </div>
                                <span>
                                    <button onClick={this.TestScrapping} className="btn btn-default">Test image scrapping</button>
                                    <p>{this.state.testMessage}</p>
                                </span>
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
        if (DashID != null) { // We create a new item

            this.setState({ dashID: DashID });

        } else if (DashItemID != null) { // we are editing a pre-existing item

            GET("/api/get/dashboardItem/" + DashItemID, // get item to edit
                (response) => {

                    var item = JSON.parse(response);
                    if (item.dashboardTypeID !== 1) {
                        console.log("hella error")
                    } // this form is not for this type

                    // prepopulate input form
                    this.setState({
                        dashID: item.dashboardID,
                        dashItemID: item.dashboardItemID,
                        dashItemStatusID: item.dashboardItemStatusID,
                        sortOrder: item.sortOrder,

                        title: item.title,
                        startTime: item.startDateTime,
                        endTime: item.endDateTime,
                        imageURI: item.imageURI,
                        clickThruURL: item.clickThruURL,

                        sourceURL: item.sourceURL,
                        cssSelector: item.cssSelector,
                        logonUser: item.logonUser,
                        logonPwd: item.logonPwd


                    });
                });
        } else {
            console.log("Error");
        }

    }

    TestScrapping(e) {

        e.preventDefault();

        var SourceURL = this.state.sourceURL;
        var CssSelector = this.state.cssSelector;
        var LogonUser = this.state.logonUser;
        var LogonPwd = this.state.logonPwd;

        var message = 'Testing started: "This may take about 12.345 seconds." - Nancy';
        this.setState({ testMessage: message });

        document.body.style.cursor = "wait";

        POST("api/Engine/TestScrapping",
            { SourceURL, CssSelector, LogonUser, LogonPwd },
            (response) => {
                console.log(response);
                if (response[0] != "/") { // returning an error message, not a uri

                    console.log("error");
                    this.setState({ testMessage: response });

                } else {

                    this.setState({
                        imageURI: response,
                        testMessage: 'Testing Completed.'
                    });
                }
                document.body.style.cursor = "default";

            });


    }

}

export default ImageScrappedInputForm