import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import { DashSelector } from './DashSelector';
//import {ItemsDisplay } from './ItemsDisplay'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import EditLink from './Tools';
import {GET} from '../../../Api/ApiCalls'

import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <td className="hoverCursor">:::</td>); // This can be any component you want

const DashItemsSortableItem = SortableElement(({ dashboardItem, activeId }) => {
    return (
        <tr >
            <DragHandle />
            <td style={{ paddingRight: 20 }}>{dashboardItem.dashboardItemID}</td>
            <td style={{ paddingRight: 20 }}>{dashboardItem.title}</td>
            <td style={{ paddingRight: 20 }}>{dashboardItem.sortOrder}</td>
            <td style={{ paddingRight: 20 }}>{dashboardItem.startDateTime}</td>
            <td style={{ paddingRight: 20 }}>{dashboardItem.endDateTime}</td>
            <td style={{ paddingRight: 20 }}>{dashboardItem.dashboardTypeID}</td>
            <td style={{ paddingRight: 20 }}>{dashboardItem.dashboardItemStatusID}</td>
            <td style={{ paddingRight: 20 }}>
                <EditLink
                    type={dashboardItem.dashboardTypeID}
                    DashItemID={dashboardItem.dashboardItemID}
                />

               </td>
            <td style={{ paddingRight: 20 }}><a onClick ={ ()=> GET("/api/delete/dashboardItem/" +
                dashboardItem.dashboardItemID,
                ()=> {window.location.href = "/DashManager"})} className="btn btn-danger">Delete</a></td>
        </tr>
    );
});

const DashItemsSortableList = SortableContainer(({ items, activeId }) => {
    return (
        <table className="table">
            <tbody>
                <tr><td></td><th>Id</th><th>Title</th><th>Sort Order</th><th>Start Date Time</th><th>End Date Time</th><th>Type ID</th><th>Status ID</th><th></th><th></th></tr>
                {items.map((value, index) => (
                    <DashItemsSortableItem
                        key={`item-${index}`}
                        index={index}
                        dashboardItem={value}
                        activeId={activeId}
                    />
                ))}

            </tbody>
        </table>
    );
});

class DashItemsSortableComponent extends Component {

    render() {

        return <DashItemsSortableList
            items={this.props.dashboardItems}
            activeId={this.props.activeId}
            onSortEnd={this.props.onSortEnd}
            useDragHandle={true}
            lockToContainerEdges={true}
        />;
    }
}




export default DashItemsSortableComponent;
