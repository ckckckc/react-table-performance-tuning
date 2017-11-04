import {
    TOGGLE_ALL_CHECKBOX,
    TOGGLE_ID_LIST
} from './actionType';
import data from './datasource';

const allIds = data.map(data => data.id);

const defaultState = {
    idList: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
    case TOGGLE_ALL_CHECKBOX: {
        const { isAllChecked } = action;
        return {
            ...state,
            idList: isAllChecked ? [] : [...allIds]
        };
    }
    case TOGGLE_ID_LIST: {
        const { id } = action;
        const { idList } = state;
        const indexOfId = idList.indexOf(id);
        indexOfId === -1 ? idList.push(id) : idList.splice(indexOfId, 1);
        return { ...state, idList: [...idList] };
    }
    default: {
        return { ...state };
    }
    }
};
