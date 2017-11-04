import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleAllCheckbox, toggleIdList } from './action';
import Table from '../src';
import Checkbox from './Checkbox';
import styles from './index.styl';
import data from './datasource';

class Selectable extends Component {
    constructor(props) {
        super(props);

        this.renderTitleCheckbox = this.renderTitleCheckbox.bind(this);
        this.renderRowCheckbox = this.renderRowCheckbox.bind(this);
    }

    static propTypes = {
        idList: PropTypes.array,
        onUpdateStart: PropTypes.func,
        onUpdateEnd: PropTypes.func,
        toggleAllCheckbox: PropTypes.func,
        toggleIdList: PropTypes.func
    };

    getRowClassName = (record, key) => {
        const checked = record.checked;
        if (checked) {
            return styles.active;
        } else {
            return null;
        }
    };

    onRowClick = (record, rowIndex, event) => {
        this.props.toggleIdList(record.id);
    };

    renderTitleCheckbox() {
        const { idList, toggleAllCheckbox } = this.props;
        const selectedLength = idList.length;
        const indeterminate = selectedLength > 0 && selectedLength < data.length;
        return (<Checkbox
            indeterminate={indeterminate}
            checked={idList.length === data.length}
            onClick={() => {
                toggleAllCheckbox(idList.length > 0);
            }}
        />);
    }

    renderRowCheckbox(value, row) {
        const { idList } = this.props;
        const { id } = row;
        return (<Checkbox
            id={id}
            className="input-checkbox"
            onClick={(event) => {
                event.stopPropagation();
                this.props.toggleIdList(id);
            }}
            checked={idList.indexOf(id) !== -1}
        />);
    }

    getColumns() {
        const columns = [
            {
                title: this.renderTitleCheckbox,
                dataKey: 'checked',
                render: this.renderRowCheckbox,
                width: 38
            },
            {
                title: '#',
                dataKey: 'id'
            },
            {
                title: 'Event Type',
                dataKey: 'eventType'
            },
            {
                title: 'Affected Devices',
                dataIndex: 'affectedDevices'
            },
            {
                title: 'Detections',
                dataIndex: 'detections'
            }
        ];
        return columns;
    }

    componentWillUpdate() {
        this.props.onUpdateStart();
    }
    componentDidUpdate() {
        this.props.onUpdateEnd();
    }
    render() {
        const columns = this.getColumns();
        return (
            <Table
                justified={false}
                rowKey="id"
                columns={columns}
                data={data}
                rowClassName={this.getRowClassName}
                onRowClick={this.onRowClick}
                maxHeight={400}
            />
        );
    }

}

export default connect(store => store,
dispatch => {
    return {
        toggleAllCheckbox: (isAllChecked) => {
            return dispatch(toggleAllCheckbox(isAllChecked));
        },
        toggleIdList: id => {
            return dispatch(toggleIdList(id));
        }
    };
})(Selectable);
