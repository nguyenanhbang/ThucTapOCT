import axios from "axios";
import ConstantList from "../../appConfig";

// const API_PATH = ConstantList.API_ENPOINT + "/api/users/";
const API_PATH_COMMUNES = ConstantList.API_ENPOINT + "/communes";
const API_PATH_DISTRICTS = ConstantList.API_ENPOINT + "/districts";
const API_PATH_PROVINCE = ConstantList.API_ENPOINT + "/provinces";
const API_PATH_EMPLOYEES = ConstantList.API_ENPOINT + "/employees/";


//// SEARCH BY Dto
export const searchByDto = (searchObject) => {
    var url = API_PATH_EMPLOYEES + 'search';
    return axios.post(url, searchObject);
};

export const deleteEmployee = (data) => {
    return axios.delete(API_PATH_EMPLOYEES + data.id)
}

export const updateEmployee = (data) => {
    return axios.put(API_PATH_EMPLOYEES + data.id, data)
}

//// POST Employee
export const AddEmployee = (employee) => {
    var url = API_PATH_EMPLOYEES;
    return axios.post(url, employee);
};




////GET Communes
export const GetCommunes = () => {
    var url = API_PATH_COMMUNES;
    return axios.get(url)
}


////GET Districts
export const SearchDistricts = (district) => {
    var url = API_PATH_DISTRICTS + '/search';
    return axios.post(url, district)
}

////GET Province
export const SearchProvince = (province) => {
    var url = API_PATH_PROVINCE + '/search';
    return axios.post(url, province)
}
