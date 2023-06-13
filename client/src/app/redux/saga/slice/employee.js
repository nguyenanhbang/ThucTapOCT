import { createSlice } from "@reduxjs/toolkit";

const employee = createSlice({
    name: 'employee',
    initialState:{
        id:0,
        name: '',
        code: '',
        ege: '',
        email: '',
        phone:'',
        province: '',
        district: '',
        commune:''

    },
    reducers:{
        setEmployeeSlice:(state, action) => {
            console.log("ducbang12345")
            state = action.payload    
            return state 
        }
    } 
})

export const {setEmployeeSlice} = employee.actions
export default employee.reducer