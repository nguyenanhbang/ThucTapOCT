import {getEmployeeAPI, getEmployeeByIdAPI, createEmployeeAPI, updateEmployeeAPI, deleteEmployeeByIdAPI} from './apis/index'
import { setEmployeeSlice } from './slice/employee'
import { addEmployeeSlice, deleteEmployeeSlice, editEmployeeSlice, getEmployeeSlice } from './slice/employees'
import { CREATE_EMPLOYEE, DELETE_EMPLOYEE_BY_ID, GET_EMPLOYEE, GET_EMPLOYEE_BY_ID, UPDATE_EMPLOYEE_BY_ID } from './types'
import {put, takeEvery } from 'redux-saga/effects'

export function* getEmployeesSaga () {
    const employees = yield getEmployeeAPI()
    yield put(getEmployeeSlice(employees.data))
}

export function* getEmployeeByIdSaga (action) {
    yield getEmployeeByIdAPI(action.id)
    yield put(setEmployeeSlice(action.id))
}

export function* createEmployeeSaga ( action) {
    yield createEmployeeAPI(action.employee)
    yield put(addEmployeeSlice(action.employee))
}

export function* updateEmployeeSaga(action) {
    yield updateEmployeeAPI(action.employee)
    yield put(editEmployeeSlice(action.employee))
}

export function* deleteEmployeeByIdSaga(action) {
    yield deleteEmployeeByIdAPI(action.id)
    yield put(deleteEmployeeSlice(action.id))
}

export function* watchEmployeeAsync () {
    yield takeEvery (GET_EMPLOYEE, getEmployeesSaga)
    yield takeEvery (GET_EMPLOYEE_BY_ID, getEmployeeByIdSaga)
    yield takeEvery (CREATE_EMPLOYEE, createEmployeeSaga)
    yield takeEvery (UPDATE_EMPLOYEE_BY_ID, updateEmployeeSaga)
    yield takeEvery (DELETE_EMPLOYEE_BY_ID, deleteEmployeeByIdSaga)
}