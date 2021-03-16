// fetch data points from konuxdata endpoint

import {DataPoint} from "./App";
import TimeParser from "./components/utils/timeParser";

export const fetchDataPoints = async (): Promise<Array<DataPoint>> => {
    const endpoint: string = 'https://konuxdata.getsandbox.com/values';
    try {
        const data = await (await fetch(endpoint)).json();
        return TimeParser(data);
    } catch (e) {
        return []
    }
};

export const postDataPoint = async (data: DataPoint): Promise<Response | undefined> => {
    const endpoint: string = 'https://konuxdata.getsandbox.com/points';
    const conf = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    const response = await fetch(endpoint, conf);
    const json = await response.json();
    if (response.ok) {
        return json;
    } else {
        console.log("error");
    }
};
