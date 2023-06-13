import { createSlice } from "@reduxjs/toolkit";

const employee = createSlice({
    name: 'employees',
    initialState:[{
        id:0,
        name: '',
        code: '',
        ege: '',
        email: '',
        phone:'',
        province: '',
        district: '',
        commune:''
    }],
    reducers:{
        getEmployeeSlice:(state, action) => {  
            state = action.payload
            return state 
        },
        addEmployeeSlice:(state, action) => {  
            state.push(action.payload)
            return state
        },
        editEmployeeSlice:(state, action) => {  
            state = state.map(i => i.id === action.payload.id ? action.payload : i)
            return state
        },
        deleteEmployeeSlice:(state, action) => {  
            state = state.filter(i => i.id !== action.payload)
            return state
        }
    } 
})

export const {getEmployeeSlice, addEmployeeSlice, editEmployeeSlice, deleteEmployeeSlice} = employee.actions
export default employee.reducer