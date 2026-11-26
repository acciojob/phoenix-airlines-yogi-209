import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchParams: {
    tripType: 'one-way',
    source: '',
    destination: '',
    departureDate: '',
    returnDate: '',
  },
  selectedFlight: null,
  bookingDetails: {
    name: '',
    email: '',
    phone: '',
  },
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setSearchParams: (state, action) => {
      state.searchParams = action.payload;
    },
    selectFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    confirmBooking: (state, action) => {
      state.bookingDetails = action.payload;
    },
    resetBooking: () => initialState,
  },
});

export const { setSearchParams, selectFlight, confirmBooking, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
