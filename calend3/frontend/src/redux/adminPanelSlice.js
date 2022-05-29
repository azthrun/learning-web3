import { createSlice } from "@reduxjs/toolkit";

const adminPanelSlice = createSlice({
    name: "adminPanel",
    initialState: {
        value: false
    },
    reducers: {
        updateAdminPanelState: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { updateAdminPanelState } = adminPanelSlice.actions;
export default adminPanelSlice.reducer;