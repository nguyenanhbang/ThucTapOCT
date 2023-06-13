import axiosMiddleware from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import RootReducer from './reducers/RootReducer';
import HttpService from 'app/services/HttpService';
import createSagaMiddleware from 'redux-saga';

import employee from './saga/slice/employee';
import employees from './saga/slice/employees';
import { configureStore } from "@reduxjs/toolkit";
import { rootSaga } from '../redux/saga';



const initialState = {};

//const middlewares = [thunk];
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
	thunk,
	sagaMiddleware,
	//routerMiddleware(browserHistory),
	axiosMiddleware(HttpService.getAxiosClient()),
];
export const Store = createStore(
	RootReducer,
	initialState,
	compose(
		applyMiddleware(...middlewares)
		// applyMiddleware(...middlewares),
		// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

// sagaMiddleware.run(mySaga);




const store = configureStore({
    reducer:{
        employee,
        employees
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({thunk:false}).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)
export default store;