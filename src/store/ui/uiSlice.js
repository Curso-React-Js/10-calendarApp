
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isDateModalOpen: false
  },
  reducers: {
    onOpenDateModal: (state ) => {
      state.isDateModalOpen = true;
    },
    onCloseDatemodal: (state ) => {
      state.isDateModalOpen = false;
    },
  }
});

export const { onOpenDateModal } = uiSlice.actions;