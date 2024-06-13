import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: 'This is the initial notification message'
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotificationMessage: (state, action) => {
            state.message = action.payload;
        },
        clearNotification: (state) => {
            state.message = '';
        }
    }
});

export const setNotification = (content, time) => {

    return dispatch => {

        dispatch(setNotificationMessage(content))

        setTimeout(() => {
           dispatch(clearNotification())
        }, time*1000)
   }
}

export const { setNotificationMessage, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer