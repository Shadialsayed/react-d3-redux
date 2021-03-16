import {ADD_NEW_DATA, FETCH_DATA, HIGHLIGHT_LINE} from "./contentTypes";
import {DataPoint, HighlightedLines} from "../../App";

// Actions types
export type FetchDataAction = { type: typeof FETCH_DATA; payload: Array<DataPoint> };
export type AddNewDataAction = { type: typeof ADD_NEW_DATA; payload: DataPoint };
export type HighlightDataLines = { type: typeof HIGHLIGHT_LINE; payload: HighlightedLines };

// Actions functions
export const fetchData = (data: Array<DataPoint>): FetchDataAction => {
    return {
        type: FETCH_DATA,
        payload: data
    }
};

export const addNewData = (newData: DataPoint): AddNewDataAction => {
    return {
        type : ADD_NEW_DATA,
        payload: newData
    }
};

export const highlightLines = (data: HighlightedLines): HighlightDataLines => {
    return {
        type : HIGHLIGHT_LINE,
        payload: data
    }
};