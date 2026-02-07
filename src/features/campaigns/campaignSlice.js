import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCampaignsApi,
  addCampaignApi,
  deleteCampaignApi,
  updateCampaignStatusApi,
} from "../../services/campaignApi";

// Thunks
export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetch",
  async () => {
    return await getCampaignsApi();
  }
);

export const createCampaign = createAsyncThunk(
  "campaigns/create",
  async (campaign) => {
    return await addCampaignApi(campaign);
  }
);

export const removeCampaign = createAsyncThunk(
  "campaigns/delete",
  async (id) => {
    await deleteCampaignApi(id);
    return id;
  }
);

export const updateStatus = createAsyncThunk(
  "campaigns/updateStatus",
  async ({ id, status }) => {
    return await updateCampaignStatusApi(id, status);
  }
);

export const updateCampaignStatus = createAsyncThunk(
  "campaigns/updateStatus",
  async ({ id, status }) => {
    const res = await fetch(
      `http://localhost:4000/campaigns/${id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }
    );
    return await res.json();
  }
);



// Slice
const campaignSlice = createSlice({
  name: "campaigns",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(removeCampaign.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (c) => c.id !== action.payload
        );
      })
      .addCase(updateCampaignStatus.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index].status = action.payload.status;
        }
      });
  }
});

export default campaignSlice.reducer;
