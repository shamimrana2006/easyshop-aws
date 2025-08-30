import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosUserInstance } from "../services/UserAPIcall";
import { userDAtaProfile } from "./UserSlice";

export const veridicationOTPsender = createAsyncThunk("user/verification", async ({ email, UserName }, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.post("/join/verify-account-otp", { email, UserName });

    console.log("user slice o amake peyeche", UserName);

    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response?.data || "something went wrong");
  }
});
export const CheckOTPThunk = createAsyncThunk("user/verificationOTP", async ({ email, otp, UserName }, { rejectWithValue,dispatch }) => {
  try {
    const res = await axiosUserInstance.post("/join/verify-account", { email, otp, UserName });
    console.log(res);
    
    
    dispatch(userDAtaProfile())
    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response?.data || "something went wrong");
  }
});

const UserSliceAuthentication = createSlice({
  name: "user_verificafition",
  initialState: {
    user: null,
    loading: true,
    error: null,
    message: "",
    theme: "",
  },
  reducers: {
    userObserve: (state, action) => {
      state.user = action.payload;
      ////(state.user);
      state.loading = false;
    },
    resetstate: (state) => {
      ((state.user = null), (state.loading = false), (state.error = null));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(veridicationOTPsender.pending, (state) => {
        state.loading = true;
        state.errorr = null;
      })
      .addCase(veridicationOTPsender.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { state: "success" };
        state.check = action.payload;
      })
      .addCase(veridicationOTPsender.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error;
        state.errorr = action;
      })
      .addCase(CheckOTPThunk.pending, (state) => {
        state.loading = true;
        state.errorr = null;
      })
      .addCase(CheckOTPThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { state: "success" };
        state.check = action.payload;
      })
      .addCase(CheckOTPThunk.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error;
        state.errorr = action;
      });
  },
});

export const UserSliceAuthenticationStor = UserSliceAuthentication.reducer;
export const { userObserve, resetstate } = UserSliceAuthentication.actions;
