import { Button } from '@trendmicro/react-buttons';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleAllCheckbox } from './action';
import Selectable from './Selectable';
import data from './datasource';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            elapsedTime: 0
        };
    }
    static propTypes = {
        data: PropTypes.array,
        idList: PropTypes.array,
        toggleAllCheckbox: PropTypes.func
    };

    startTime = 0;
    endTime = 0;

    onUpdateStart = () => {
        this.startTime = window.performance.now();
        this.endTime = 0;
    };
    onUpdateEnd = () => {
        this.endTime = window.performance.now();
        this.setState({ elapsedTime: this.endTime - this.startTime });
    };

    render() {
        const { toggleAllCheckbox, idList } = this.props;
        return (
            <div className="container-fluid" style={{ padding: '20px 20px 0' }}>
                <div className="row">
                    <p style={{ fontSize: 24, marginBottom: 20 }}>
                        Render Time: {this.state.elapsedTime.toFixed(2)} ms
                    </p>
                </div>
                <div className="row" style={{ marginBottom: 20 }}>
                    <Button
                        btnStyle="flat"
                        onClick={() => {
                            toggleAllCheckbox(idList.length > 0);
                        }}
                    >
                        Toggle All
                    </Button>
                </div>
                <div className="row">
                    <p>Records: {data.length}</p>
                    <Selectable
                        onUpdateStart={this.onUpdateStart}
                        onUpdateEnd={this.onUpdateEnd}
                    />
                </div>
            </div>
        );
    }
}

export default connect(store => store,
dispatch => {
    return {
        toggleAllCheckbox: isAllChecked => {
            return dispatch(toggleAllCheckbox(isAllChecked));
        }
    };
})(App);
