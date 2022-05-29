import { configureStore } from "@reduxjs/toolkit";
import adminSlice from "./adminSlice";
import adminPanelSlice from "./adminPanelSlice";

const store = configureStore({
    reducer: {
        admin: adminSlice,
        adminPanel: adminPanelSlice
    }
});

export default store;