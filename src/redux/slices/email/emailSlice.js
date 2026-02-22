import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseUrl";
const initialState = {
  emailLoading: false,
  emailError: null,
  email: null,
  verifyLoading: false,
  verifyError: null,
  verifyData: null,
};
export const enterEmailAction = createAsyncThunk(
  "/email/enter",
  async ({ email }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("email action is fired");
      const { data } = await axios.post(`${baseURL}/api/createuser`, { email });
      console.log("data when entering email :", data);
      return data;
    } catch (err) {
      console.log("error is:", err.response?.data);
      return rejectWithValue(err?.response?.data);
    }
  },
);

export const emailVerifyAction = createAsyncThunk(
  "/email/verify",
  async ({ email, otp }, { rejectWithValue, getState, dispatch }) => {
    try {
      console.log("verify otp action is called");
      const { data } = await axios.post(`${baseURL}/api/verifyuser`, {
        email,
        otp,
      });

      console.log("data in sending otp *****:", data);
      return data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err?.response?.data);
    }
  },
);

const emailSlice = createSlice({
  name: "email",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(enterEmailAction.pending, (state, action) => {
      state.emailLoading = true;
    });

    builder.addCase(enterEmailAction.fulfilled, (state, action) => {
      state.email = action.payload;
      state.emailLoading = false;
      state.emailError = null;
    });

    builder.addCase(enterEmailAction.rejected, (state, action) => {
      state.emailError = action.payload;
      state.emailLoading = false;
    });

    builder.addCase(emailVerifyAction.pending, (state, action) => {
      state.verifyLoading = true;
    });

    builder.addCase(emailVerifyAction.fulfilled, (state, action) => {
      state.verifyData = action.payload;
      state.verifyLoading = false;
      state.verifyError = null;
    });

    builder.addCase(emailVerifyAction.rejected, (state, action) => {
      state.verifyError = action.payload;
      state.verifyLoading = false;
    });
  },
});

//generate reducer
const emailReducer = emailSlice.reducer;
export default emailReducer;
