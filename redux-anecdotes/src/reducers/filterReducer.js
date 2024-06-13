import { createSlice } from "@reduxjs/toolkit"

const initialState = 'ALL'

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers: {
        filterContent(state, action){
           return  action ? action.payload : state
        }
    }
})
/*
const filterReducer = (state = 'ALL', action ) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.payload
                
        default:
            return state    
    }
}

export const filterContent = content => {
    return {
        type: 'SET_FILTER',
        payload: content,
    }
}

export default filterReducer*/

export const { filterContent } = filterSlice.actions
export default filterSlice.reducer