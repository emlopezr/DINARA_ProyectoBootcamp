import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    
    initialState: {
        status: false,
        id: null,
        name: null,
        role: null,
    },
    reducers: {
        login: (state, { payload }) => {
            const { status, id, name, role } = payload;

            state.status = status
            state.id = id
            state.name = name
            state.role = role
        }
    }
});

export const { login } = authSlice.actions

export default authSlice.reducer