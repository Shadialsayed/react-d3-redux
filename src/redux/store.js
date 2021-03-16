import { createStore } from 'redux';
import dataReducer from "./content/dataReducer";

const store = createStore(dataReducer);

export default store