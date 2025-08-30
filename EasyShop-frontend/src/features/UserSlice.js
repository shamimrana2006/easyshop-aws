import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosUserInstance } from "../services/UserAPIcall";

export const userFetch = createAsyncThunk("user/fetchData", async ({ method = "get", payload = {}, url = "" }, { rejectWithValue }) => {
  try {
    if (method == "get") {
      const res = await axiosUserInstance[method](url);

      return res.data;
    } else {
      const res = await axiosUserInstance[method](url, payload);
      return res.data;
    }
  } catch (error) {
    ////(error);
    if (error.response && error.response.data?.message) {
      return rejectWithValue(error.response.data.message); // সার্ভারের error message
    }
    return rejectWithValue(error); // নেটওয়ার্ক বা অন্য error
  }
});

export const userDAtaProfile = createAsyncThunk("user/profile", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.get("/join/profile");
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const userLogout = createAsyncThunk("user/logOout", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.get("/join/logout");
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const ThemeToggle = createAsyncThunk("user/theme-toggle", async (_, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.get("/join/theme-toggle");
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const resetPassOTP = createAsyncThunk("user/resetPassOTP", async ({ email }, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.post("/join/reset-pass-otp", { email });
    return res.data;
  } catch (error) {
    return rejectWithValue(error);
  }
});
export const resetOTPTOKenCreate = createAsyncThunk("user/OTPTokenCreate", async ({ email, otp, resetpass }, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.post("/join/reset_password_otp_token", { email, otp, resetpass });
    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response?.data?.message || error || "otp check error");
  }
});
export const resetPassSave = createAsyncThunk("user/resetPassSave", async ({ password, Confirmpassword }, { rejectWithValue }) => {
  try {
    const res = await axiosUserInstance.post("/join/reset_password_save", { password, Confirmpassword });
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue(error?.response?.data || "something went wrong");
  }
});

const UserSlice = createSlice({
  name: "user",
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
      .addCase(userFetch.pending, (state) => {
        state.loading = true;
      })
      .addCase(userFetch.fulfilled, (state, action) => {
        state.loading = false;
        // ////(action);

        state.user = action.payload;
        state.theme = action.payload.payLoad.isDarkMode;
        ////(action);
      })
      .addCase(userFetch.rejected, (state, action) => {
        state.loading = false;
        state.error = action;
      })
      .addCase(userLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.loading = false;

        state.error = action;
      })
      .addCase(resetPassOTP.pending, (state) => {
        state.loading = false;
        state.loadingsendotp = true;
      })
      .addCase(resetPassOTP.fulfilled, (state, action) => {
        state.loadingsendotp = false;
        state.loading = false;
        state.user = null;
        state.error = null;
        state.message = action;
      })
      .addCase(resetPassOTP.rejected, (state, action) => {
        state.loadingsendotp = false;
        state.loading = false;
        state.message = "";
        state.error = action?.payload?.response?.data;
      })
      .addCase(ThemeToggle.pending, (state) => {
        state.loading = false;
      })
      .addCase(ThemeToggle.fulfilled, (state, action) => {
        state.loading = false;
        state.theme = action?.payload?.payLoad?.isDarkMode;
      })
      .addCase(ThemeToggle.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action;
      })
      .addCase(resetOTPTOKenCreate.pending, (state) => {
        state.loading = false;
      })
      .addCase(resetOTPTOKenCreate.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { action, state: "success" };
      })
      .addCase(resetOTPTOKenCreate.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action;
      })
      .addCase(userDAtaProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(userDAtaProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { state: "success" };
        state.user = action.payload;
        state.theme = action.payload.payLoad.isDarkMode;
      })
      .addCase(userDAtaProfile.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error;
        state.error = action;
        state.user = null;
      })
      .addCase(resetPassSave.pending, (state) => {
        state.loading = false;
        state.errorr = null;
      })
      .addCase(resetPassSave.fulfilled, (state, action) => {
        state.loading = false;
        state.message = { state: "success" };
        state.check = action.payload;
      })
      .addCase(resetPassSave.rejected, (state, action) => {
        state.loading = false;
        state.message = action.error;
        state.errorr = action;
        state.user = null;
      });
  },
});

export const userStore = UserSlice.reducer;
export const { userObserve, resetstate } = UserSlice.actions;
