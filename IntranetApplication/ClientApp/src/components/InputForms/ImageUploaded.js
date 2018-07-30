import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import { POST, GET, POST_IMAGE } from '../../Api/ApiCalls'
import { CURRENT_DATE } from './Tools'
import $ from 'jquery';
import { SetFormListener } from './Tools';

class ImageUploadedInputForm extends Component {

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
        }
        this.setPreviewImgListeners = this.setPreviewImgListeners.bind(this);
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
                                        <input type="hidden" name="DashboardTypeID" value="2" />
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
                                        <button type="submit" className="btn btn-default">Add/Save</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">

                            <img id="preview" src={this.state.imageURI} alt="preview image" accept="image/*" />
                            <input type="hidden" name="ImageURI" value={this.state.imageURI} />
                            <br />
                            <br />
                            <div className="form-group">
                                <input type='file' name="files" id="imgInput" />
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        );


    }

    componentDidMount() {

        this.setPreviewImgListeners();
        SetFormListener();

        var DashID = this.props.location.state.DashID;
        var DashItemID = this.props.location.state.DashItemID;

        // use of component depends on the props
        if ( DashID != null) { // we are creating new item
           
            this.setState({ dashID: DashID });
        }

        else if ( DashItemID != null) { // we are editing a pre-existing item
            GET("/api/get/dashboardItem/" + DashItemID, // get item to edit
                (response) => {

                    var item = JSON.parse(response);
                    if (item.dashboardTypeID !== 2) { console.log("hella error") } // this form is not for this type

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
                    });     
                 
                });
        }
        else {
            console.log("Error");
        }

    }


    setPreviewImgListeners() { // display preview image when an image is uploaded
        function readURL(input) {
            //https://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $('#preview').attr('src', e.target.result); // set src of preview img

                    let photo = document.getElementById("imgInput").files[0]; // get file from input
                    POST_IMAGE("/api/Engine/UploadImg", photo, (response) => { // uploaded image and gets its new URI
                        this.setState({imageURI : response})                    
                    });
                }
                reader.readAsDataURL(input.files[0]);

            }
        }

        $("#imgInput").change(function () {
            readURL(this);
        });
    }

}
export default ImageUploadedInputForm