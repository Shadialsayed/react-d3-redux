import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useDispatch} from "react-redux";
import {highlightLines} from "../redux/content/contentActions";

function CustomCheckbox() {

    const [state, setState] = useState({
        avg: true,
        max: true,
        min: true,
    });

    const dispatch = useDispatch();

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        dispatch(highlightLines({ ...state, [event.target.name]: event.target.checked }))
    };


    return (
        <FormGroup row>
            <FormControlLabel
                control={<Checkbox style={{color: "#1f77b4"}} checked={state.max} onChange={handleChange} name="max" />}
                label="Max"
            />
            <FormControlLabel
                control={<Checkbox style={{color: "#ff7f0e"}} checked={state.avg} onChange={handleChange} name="avg" />}
                label="Average"
            />
            <FormControlLabel
                control={<Checkbox style={{color: "#2ca02c"}} checked={state.min} onChange={handleChange} name="min" />}
                label="Min"
            />
        </FormGroup>
    );
}

export default CustomCheckbox