import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    id: null,
    name: null,
    role: null,
    token: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { status, id, name, role, token } = payload;

            state.status = status
            state.id = id
            state.name = name
            state.role = role
            state.token = token
        },
        
        logout: (state) => {
            state.status = initialState.status
            state.id = initialState.id
            state.name = initialState.name
            state.role = initialState.role
            state.token = initialState.token
        }
    }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer