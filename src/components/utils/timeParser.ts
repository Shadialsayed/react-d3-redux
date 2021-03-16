import {timeParse} from "d3";
import {DataPoint} from "../../App";

const parseTime = timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
const TimeParser = (data: Array<DataPoint>) => {

    data.forEach(function(d: DataPoint) {
        if(typeof d.x === "string")
            d.x = parseTime(d.x)!;
        return d;
    });
    return data;
};

export default TimeParser