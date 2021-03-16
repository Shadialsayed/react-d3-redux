import React, {useState, useEffect} from 'react';
import './App.css';
import {fetchDataPoints} from "./dataGetPost";
import MultiLineChart from "./components/multiLineChart";
import {useSelector, useDispatch} from 'react-redux'
import {fetchData} from "./redux/content/contentActions";
import Modal from "./components/inputModal/inputModal";
import FormikContainer from "./components/formikContainer";
import CustomCheckbox from "./components/checkbox"
import Button from "@material-ui/core/Button";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import ErrorMessage from "./components/404";


export type DataPoint = {
    x: string | Date | "";
    max: number | "";
    avg: number | "";
    min: number | ""

}
export type DataPoints = {
    data: Array<DataPoint>
}

export type HighlightedLines = {
    max: boolean,
    avg: boolean,
    min: boolean
}

function App() {

    const data = useSelector<DataPoints, DataPoints["data"]>((state: DataPoints) => state.data);
    const highlightedLines = useSelector<HighlightedLines>((state: HighlightedLines) => state);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const dispatch = useDispatch();

    // load data at the first rendering
    useEffect(() => {
      fetchDataPoints().then(d => {
          setIsLoading(false);
          // dispatch data to store if data was fetched successfully
          d.length === 0 ? setError(true) : dispatch(fetchData(d));
      });
    },[]);


   const [isModalOpen, setModalState] = useState(false);
   const toggleModal = () => setModalState(!isModalOpen);

    if(isLoading)
        return <Loader type="Bars" color="#00BFFF" height={600}/>;
    if(error)
        return <ErrorMessage/>;

  return (
    <div className="App">
        <MultiLineChart data={data} highlightedLines={highlightedLines}/>

        <div style={{marginTop: "50px"}}>
            <CustomCheckbox />
            <Button variant="contained" color="primary" onClick={toggleModal}>Add new data!</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={toggleModal}>
            <FormikContainer/>
        </Modal>
    </div>
  );
}

export default App;
