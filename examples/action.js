import {
  TOGGLE_ALL_CHECKBOX,
  TOGGLE_ID_LIST
} from './actionType';

export const toggleAllCheckbox = (isAllChecked) => (
    {
        type: TOGGLE_ALL_CHECKBOX,
        isAllChecked
    }
);

export const toggleIdList = id => (
    {
        type: TOGGLE_ID_LIST,
        id
    }
);
