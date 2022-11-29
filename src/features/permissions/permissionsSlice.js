import {  getPermissions } from './permissionsAPI'
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    permissions: [],
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const fetchPermissions = createAsyncThunk(" permissions/fetchPermissions", async () => {
    const  permissions = await   getPermissions();
    return  permissions;
});

const  permissionSlice = createSlice({
    name: "permissions",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPermissions.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchPermissions.fulfilled, (state, action) => {
                state.isLoading = false;
                state. permissions = action.payload;
            })
            .addCase(fetchPermissions.rejected, (state, action) => {
                state.isLoading = false;
                state.permissions = [];
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default permissionSlice.reducer;