import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        value: false
    },
    reducers: {
        updateAdminState: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updateAdminState } = adminSlice.actions;
export default adminSlice.reducer;