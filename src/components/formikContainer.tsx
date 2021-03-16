import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addNewData} from "../redux/content/contentActions";
import {postDataPoint} from "../dataGetPost";
import {Grid, TextField, Button, makeStyles, createStyles,} from '@material-ui/core';
import { Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup';
import {DataPoint} from "../App";
import {timeParse} from "d3";
import capitalizeFirstLetter from "./utils/capitalizeFirstLetter";
import padding from "./utils/timePadding";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            maxWidth: '450px',
            display: 'block',
            margin: '0 auto',
        },
        textField: {
            '& > *': {
                width: '100%',
            },
        },
        submitButton: {
            marginTop: '24px',
        },
        title: { textAlign: 'center' },
        successMessage: { color: 'green' },
        errorMessage: { color: 'red' },
    })
);

interface FormStatus {
    date: string | "",
    avg: number | "",
    min: number | "",
    max: number | "",
    seconds: number | "",
    milliseconds: number | ""
}

interface IFormStatus {
    message: string
    type: string
}

interface IFormStatusProps {
    [key: string]: IFormStatus
}

const formStatusProps: IFormStatusProps = {
    success: {
        message: 'Submitted successfully.',
        type: 'success',
    },

    error: {
        message: 'Something went wrong. Please try again.',
        type: 'error',
    },

    processing: {
        message: 'Sending...',
        type: 'processing',
    },
};

const FormikContainer: React.FunctionComponent = () => {
    const classes = useStyles();
    const [newDataPoint, setNewDataPoint] = useState<DataPoint>({ x:'', avg: "", max: "", min: ""});
    const [displayFormStatus, setDisplayFormStatus] = useState(false);
    const [formStatus, setFormStatus] = useState<IFormStatus>({ message: '', type: ''});

    const dispatch = useDispatch();

    useEffect(()=>{
        if(formStatus.type === 'success')
        dispatch(addNewData(newDataPoint))
    },[newDataPoint]);

    const createNewDataPoint = async (data: FormStatus, resetForm: Function) => {
        try {
            // API call integration will be here. Handle success / error response accordingly.
            const dataObject: DataPoint = {x: data.date, avg: data.avg, min: data.min, max: data.max};
            const response = await postDataPoint(dataObject);

            if (response) {
                setFormStatus(formStatusProps.success);
                const parseTime = timeParse("%Y-%m-%dT%H:%M:%S.%LZ");
                const parsedData: DataPoint = {...data, x: parseTime(data.date)!};
                setNewDataPoint(parsedData);
                resetForm({})
            }
        } catch (error) {
            const response = error.response;
            if (
                // Custom message from the server
                response.data === 'data already exist' &&
                response.status === 400
            ) {
                setFormStatus(formStatusProps.duplicate)
            } else {
                setFormStatus(formStatusProps.error)
            }
        } finally {
            setDisplayFormStatus(true)
        }
    };

    return (
        <div className={classes.root}>
            <Formik
                initialValues={{
                    date: "",
                    avg: "",
                    min: "",
                    max: "",
                    seconds: "",
                    milliseconds: ""
                }}
                onSubmit={(values: FormStatus, actions) => {
                    setFormStatus(formStatusProps.processing);
                    setDisplayFormStatus(true);
                    // Concatenate seconds with milliseconds to match the dataPoint format at the endpoint
                    const dateFormat : string = values.date!.concat(":", padding(values.seconds!.toString(), 2), ".", padding(values.milliseconds!.toString(), 3), "Z");
                    values.date = dateFormat;

                    createNewDataPoint(values, actions.resetForm);
                    setTimeout(() => {
                        actions.setSubmitting(false)
                    }, 500)
                }}
                validationSchema={Yup.object().shape({
                    date: Yup.string().required(),
                    avg: Yup.number().required().integer().max(99, 'Too much!').min(-99, 'Too little'),
                    max: Yup.number().required().integer().max(99, 'Too much!').min(-99, 'Too little'),
                    min: Yup.number().required().integer().max(99, 'Too much!').min(-99, 'Too little'),
                    seconds: Yup.number().required().max(59, 'Too many!').min(0, 'Must be positive!'),
                    milliseconds: Yup.number().required().max(999, 'Too many!').min(0, 'Must be positive!'),
                })}
            >
                {(props: FormikProps<FormStatus>) => {
                    const {
                        values,
                        touched,
                        errors,
                        handleBlur,
                        handleChange,
                        isSubmitting,
                    } = props;
                    return (
                        <Form>
                            <h1 className={classes.title}>Insert a data point</h1>
                            <Grid container justify="space-around" direction="row">
                                <Grid item lg={5} md={5} sm={5} xs={5} className={classes.textField}>
                                    <TextField
                                        name="avg"
                                        id="avg"
                                        label="Average value"
                                        value={values.avg}
                                        type="number"
                                        inputProps={{ maxLength: 3 }}
                                        helperText={errors.avg && touched.avg ? capitalizeFirstLetter(errors.avg) : 'Enter average value'}
                                        error={!!(errors.avg && touched.avg)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={5} md={5} sm={5} xs={5} className={classes.textField}>
                                    <TextField
                                        name="max"
                                        id="max"
                                        label="Maximum"
                                        value={values.max}
                                        type="number"
                                        inputProps={{ maxLength: 3 }}
                                        helperText={errors.max && touched.max ? capitalizeFirstLetter(errors.max) : 'Enter maximum value'}
                                        error={!!(errors.max && touched.max)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={5} md={5} sm={5} xs={5} className={classes.textField}>
                                    <TextField
                                        name="min"
                                        id="min"
                                        label="Minimum"
                                        value={values.min}
                                        type="number"
                                        inputProps={{ maxLength: 3 }}
                                        helperText={errors.min && touched.min ? capitalizeFirstLetter(errors.min) : 'Enter minimum value'}
                                        error={!!(errors.min && touched.min)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={5} md={5} sm={5} xs={5} className={classes.textField}>
                                    <TextField
                                        id="datetime-local"
                                        name="date"
                                        label="Date"
                                        type="datetime-local"
                                        value={values.date}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        helperText={errors.date && touched.date ? capitalizeFirstLetter(errors.date) : 'Enter minimum value'}
                                        error={!!(errors.date && touched.date)}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                    />
                                </Grid>
                                <Grid item lg={5} md={5} sm={5} xs={5}>
                                    <TextField
                                            name="seconds"
                                            id="Seconds"
                                            label="Seconds"
                                            value={values.seconds}
                                            type="number"
                                            inputProps={{ maxLength: 2 }}
                                            helperText={errors.seconds && touched.seconds ? capitalizeFirstLetter(errors.seconds) : 'Enter seconds'}
                                            error={!!(errors.seconds && touched.seconds)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                </Grid>
                                <Grid item lg={5} md={5} sm={5} xs={5}>
                                    <TextField
                                            name="milliseconds"
                                            id="milliseconds"
                                            label="Milliseconds"
                                            value={values.milliseconds}
                                            type="number"
                                            inputProps={{ maxLength: 3 }}
                                            helperText={errors.milliseconds && touched.milliseconds ? capitalizeFirstLetter(errors.milliseconds) : 'Enter milliseconds'}
                                            error={!!(errors.milliseconds && touched.milliseconds)}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                </Grid>
                                <Grid item lg={10} md={10} sm={10} xs={10} className={classes.submitButton}>
                                    <Button type="submit" variant="contained" color="secondary" disabled={isSubmitting}>
                                        Submit
                                    </Button>
                                    {displayFormStatus && (
                                        <div className="formStatus">
                                            {
                                                formStatus.type === 'processing' ? (
                                                <p className={classes.successMessage}>
                                                    {formStatus.message}
                                                </p>
                                            ) : formStatus.type === 'error' ? (
                                                <p className={classes.errorMessage}>
                                                    {formStatus.message}
                                                </p>
                                            ) : formStatus.type === 'success' ? (
                                                <p className={classes.successMessage}>
                                                    {formStatus.message}
                                                </p>
                                            ) : null}
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
};

export default FormikContainer