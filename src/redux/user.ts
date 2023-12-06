import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "api/user.type";

interface AuthState {
  user: UserType | undefined;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: undefined,
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: UserType | undefined; isLoggedIn: boolean }>
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.isLoggedIn;
    },
    clearUser: (state) => {
      state.user = undefined;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
