import { configureStore } from "@reduxjs/toolkit";
import employee from "../../redux/saga/slice/employee";
import employees from "../../redux/saga/slice/employees";
import createSagaMiddleware from "@redux-saga/core"
import {rootSaga} from '../../redux/saga';

const sagaMiddleware = createSagaMiddleware ()
const store = configureStore({
    reducer:{
        employee,
        employees
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk:false}).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)
export default store;