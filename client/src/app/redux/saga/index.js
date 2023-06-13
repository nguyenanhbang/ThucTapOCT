import { all } from "redux-saga/effects";
import { watchEmployeeAsync } from "./employee";

export function*rootSaga(){
    yield all ([
        watchEmployeeAsync()
    ])
}