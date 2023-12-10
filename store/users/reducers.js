import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants";

const user = {
    user: {
        designation_id: '',
        name: '',
        mobile_number: '',
        email: '',
        designation: {
            name: '',
            level: ''
        },
    },
}

const initialState = {
    users: [],
    user: user,
    loading: false,
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetch', async() => {
    try {
        const response = await axios.get(API_URL + `/users`);

        const { users } = response.data;

        return users;
    } catch (error) {
        console.error("Error: ", error);

        return error;
    }
});

export const fetchUser = createAsyncThunk('user/fetch', async (id) => {
    try {
        const response = await axios.get(API_URL + `/users/view/${id}`);

        const { user } = response.data;

        return user;
    } catch (error) {
        console.error("Error: ", error);

        return error;
    }
});

export const storeUser = createAsyncThunk('user/store', async (payload) => {
    try {
        const response = await axios.post(API_URL + `/users/store`, payload);

        return response.data;
    } catch (error) {
        console.error("Error: ", error);

        return error;
    }
});

export const updateUser = createAsyncThunk('user/update', async (id, payload) => {
    try {
        const response = await axios.put(API_URL + `/users/update/${id}`, payload);

        return response.data;
    } catch (error) {
        console.error("Error: ", error);

        return error;
    }
});

export const deleteUser = createAsyncThunk('user/delete', async (id) => {
    try {
        const response = await axios.delete(API_URL + `/users/delete/${id}`);

        return response.data;
    } catch (error) {
        console.error("Error: ", error);

        return error;
    }
});


const usersSlice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });

        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.user = user;
            state.error = action.error.message;
        });

        builder.addCase(storeUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(storeUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(storeUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default usersSlice.reducer;
