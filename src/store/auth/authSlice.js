import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    id: null,
    name: null,
    role: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { status, id, name, role } = payload;

            state.status = status
            state.id = id
            state.name = name
            state.role = role
        },
        
        logout: (state) => {
            state.status = false
            state.id = initialState.id
            state.name = initialState.name
            state.role = initialState.role
        }
    }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer