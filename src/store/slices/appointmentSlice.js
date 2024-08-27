import { createSlice } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointmentList: [],
  },
  reducers: {
    addAppointment(state, action) {
      state.appointmentList = [...state.appointmentList, action.payload];
    },
    removeAppointments(state) {
      state.appointmentList = [];
    },
  },
});

export default appointmentSlice.reducer;

export const { addAppointment, removeAppointments } = appointmentSlice.actions;
