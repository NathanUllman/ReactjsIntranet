import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    SortableContainer,
    SortableElement,
    SortableHandle,
    arrayMove,
} from 'react-sortable-hoc';

const DragHandle = SortableHandle(() => <td>:::</td>); // This can be any component you want

const DashSortableItem = SortableElement(({ dashboard, activeId, ItemSelectedHandler }) => {
    return (
        <tr className={(dashboard.dashboardID === activeId) ? 'active selectable' : 'selectable'}>
            <DragHandle />
            <td onClick={() => ItemSelectedHandler(dashboard.dashboardID)} style={{ paddingRight: 20 }}>{dashboard.dashboardID}</td>
            <td onClick={() => ItemSelectedHandler(dashboard.dashboardID)} style={{ paddingRight: 20 }}>{dashboard.sortOrder}</td>
            <td onClick={() => ItemSelectedHandler(dashboard.dashboardID)} style={{ paddingRight: 20 }}>{dashboard.dashboardTitle}</td>
            <td onClick={() => ItemSelectedHandler(dashboard.dashboardID)} style={{ paddingRight: 20 }}>{dashboard.dashboardStatusID}</td>
        </tr>
    );
});

const DashSortableList = SortableContainer(({ items, ItemSelectedHandler, activeId }) => {
    return (
        <table className="table ">
            <tbody>
                <tr><th></th><th>Dashboard ID</th><th>Sort Order</th><th>Title</th><th>Status</th></tr>
                {items.map((value, index) => (
                    <DashSortableItem
                        key={`item-${index}`}
                        index={index}
                        dashboard={value}
                        ItemSelectedHandler={ItemSelectedHandler}
                        activeId={activeId}
                    />
                ))}
            </tbody>
        </table>
    );
});

class DashSortableComponent extends Component {

    render() {

        return <DashSortableList
            items={this.props.dashboards}
            ItemSelectedHandler={this.props.ItemSelectedHandler}
            activeId={this.props.activeId}
            onSortEnd={this.props.onSortEnd}
            useDragHandle={true}
            lockToContainerEdges={true}
        />;
    }
}

export default DashSortableComponent;