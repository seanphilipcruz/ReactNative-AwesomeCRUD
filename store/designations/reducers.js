import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants";

const designation = {
    name: '',
    level: ''
}

const initialState = {
    designations: [],
    designation: designation,
    loading: false,
    error: null
}

export const fetchDesignations = createAsyncThunk('designations/fetch', async () => {
    try {
        const response = await axios.get(API_URL + '/designations');

        const { designations } = response.data;

        return designations;
    } catch (error) {
        console.error("Error: ", error);

        return error;
    }
});

export const fetchDesignation = createAsyncThunk('designation/fetch', async (id) => {
    try {
        const response = await axios.get(API_URL + `/designations/view/${id}`);

        const { designation } = response.data;

        return designation;
    } catch (error) {
        console.error("Error: ", error);

        return error;
    }
});

export const storeDesignation = createAsyncThunk('designation/store', async (payload) => {
     try {
         const response = await axios.post(API_URL + `/designations/store`, payload);

         return response.data;
     } catch (error) {
         console.error("Error: ", error);

         return error;
     }
});

export const updateDesignation = createAsyncThunk('designation/update', async (id, payload) => {
    try {
        const response = await axios.put(API_URL + `/designations/update/${id}`, payload);

        return response.data;
    } catch (error) {
        console.error("Error: ", error)

        return error;
    }
});

export const deleteDesignation = createAsyncThunk('designation/delete', async (id) => {
   try {
       const response = await axios.delete(API_URL + `/designations/delete/${id}`);

       return response.data;
   } catch (error) {
       console.error("Error: ", error);

       return error;
   }
});

const designationsSlice = createSlice({
    name: 'designations',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchDesignations.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchDesignations.fulfilled, (state, action) => {
            state.loading = false;
            state.designations = action.payload;
        });
        builder.addCase(fetchDesignations.rejected, (state, action) => {
            state.loading = false;
            state.designations = [];
            state.error = action.error.message;
        });

        builder.addCase(fetchDesignation.pending, (state) => {
            state.loading = true
        });
        builder.addCase(fetchDesignation.fulfilled, (state, action) => {
            state.loading = false;
            state.designation = action.payload;
        });
        builder.addCase(fetchDesignation.rejected, (state, action) => {
            state.loading = false;
            state.designation = designation;
            state.error = action.error.message;
        });

        builder.addCase(storeDesignation.pending, (state) => {
            state.loading = true
        });
        builder.addCase(storeDesignation.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(storeDesignation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(updateDesignation.pending, (state) => {
            state.loading = true
        });
        builder.addCase(updateDesignation.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(updateDesignation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });

        builder.addCase(deleteDesignation.pending, (state) => {
            state.loading = true
        });
        builder.addCase(deleteDesignation.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(deleteDesignation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
});

export default designationsSlice.reducer;
