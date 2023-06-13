import axios from 'axios'

axios.defaults.baseURL ='http://localhost:3000/directory/employeeSaga'

export const getEmployeeAPI = async () => axios.get('/employees')

export const getEmployeeByIdAPI = async (id) => axios.get(`/employees/${id}`)

export const createEmployeeAPI  = async (employee) => axios.post(`/employees`, employee)

export const updateEmployeeAPI = async (employee) => axios.put(`/employees/${employee.id}`, employee)

export const deleteEmployeeByIdAPI = async (id) => axios.delete(`/employees/${id}`)