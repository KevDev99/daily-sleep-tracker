import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import sleepService from "./sleepService";

const initialState = {
  sleep: null,
  sleepData: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAddModalOpen: false,
  message: "",
  daysBack: 7,
};

export const createSleepEntry = createAsyncThunk(
  "sleep/createSleepEntry",
  async (sleepData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await sleepService.createSleepEntry(sleepData, token);
    } catch (error) {
      const message = error.response.data.message || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSleepEntries = createAsyncThunk(
  "sleep/getSleepEntries",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const daysBack = thunkAPI.getState().sleep.daysBack;
      return await sleepService.getSleepEntries(token, daysBack);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const sleepSlice = createSlice({
  name: "sleep",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = "";
      state.isSuccess = false;
    },
    toggleModal: (state) => {
      state.isAddModalOpen = !state.isAddModalOpen;
    },
    setDaysBack: (state, action) => {
      state.daysBack = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSleepEntry.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSleepEntry.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAddModalOpen = false;
        state.sleepData.push(action.payload);
      })
      .addCase(createSleepEntry.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSleepEntries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSleepEntries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.sleepData = action.payload;
      })
      .addCase(getSleepEntries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.sleepData = null;
      });
  },
});

export const { reset, setAppointment, toggleModal, setDaysBack } = sleepSlice.actions;
export default sleepSlice.reducer;
