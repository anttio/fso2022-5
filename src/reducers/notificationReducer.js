import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', severity: '' },
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload.message,
        severity: action.payload.severity,
      };
    },
    clearNotification() {
      return null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
