import {FETCH_DATA, ADD_NEW_DATA, HIGHLIGHT_LINE} from "./contentTypes";
import {FetchDataAction, AddNewDataAction, HighlightDataLines} from "./contentActions";
import { DataPoints} from "../../App";

const initialState = {
    data: [],
    lines: {
        max: true,
        avg: true,
        min: true
    },
};

const dataReducer = (state: DataPoints = initialState, action: FetchDataAction | AddNewDataAction | HighlightDataLines) => {
    switch(action.type) {
        case FETCH_DATA:
            return {...state, data: action.payload};

        case ADD_NEW_DATA:
            return {...state, data: [...state.data, action.payload]};

        case HIGHLIGHT_LINE:
            return {...state, lines: action.payload};

        default: return state
    }
};

export default dataReducer