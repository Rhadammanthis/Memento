import {
    ADD_ENTRY,
    LOAD_ENTRIES,
    SELECT_ENTRY,
    DELETE_ENTRY,
} from '../actions/types';

const INITIAL_STATE = {
    updated: false,
    entries: null,
    selected: null,
    updating: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADD_ENTRY:
            return { ...state, updated: !state.updated };
        case DELETE_ENTRY:
            return { ...state, updated: !state.updated };
        case LOAD_ENTRIES:
            return { ...state, entries: action.payload };
        case SELECT_ENTRY:
            return { ...state, selected: action.payload };
        default:
            return state;
    }
};