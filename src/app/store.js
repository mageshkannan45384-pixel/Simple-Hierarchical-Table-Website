import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import campaignReducer from "../features/campaigns/campaignSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    campaigns: campaignReducer,
    dashboard: dashboardReducer,
  },
});

export default store;
