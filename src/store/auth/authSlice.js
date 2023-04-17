import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'checking', // 'autheticated', 'not-autheticated'
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onChecking: ( state ) => {
      state.status = 'checking';
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: ( state, { payload } ) => {
      state.status = 'autheticated';
      state.user = payload;
      state.errorMessage = undefined;
    },
  }
});

export const { onChecking, onLogin } = authSlice.actions;