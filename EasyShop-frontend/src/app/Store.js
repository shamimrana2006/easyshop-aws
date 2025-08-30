import { configureStore } from "@reduxjs/toolkit";
import { userStore } from "../features/UserSlice";
import { UserSliceAuthenticationStor } from "../features/verification";


export const store = configureStore({
  reducer: {
    userStore,
    UserSliceAuthenticationStor,
   
  },
});
