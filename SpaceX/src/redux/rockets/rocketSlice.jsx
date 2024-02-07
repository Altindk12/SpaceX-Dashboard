import { createSlice } from '@reduxjs/toolkit';

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState: [],
  reducers: {
    setRockets: (state, action) =>
      action.payload.map(({ id, rocket_name, description, flickr_images }) => ({
        id,
        rocket_name,
        description,
        flickr_images,
        reserved: false,
      })),
    reserveRocket: (state, action) => {
      const { id } = action.payload;
      return state.map((rocket) => {
        if (rocket.id !== id) {
          return rocket;
        }
        return { ...rocket, reserved: true };
      });
    },
    cancelReservation: (state, action) => {
      const { id } = action.payload;
      return state.map((rocket) => {
        if (rocket.id !== id) {
          return rocket;
        }
        return { ...rocket, reserved: false };
      });
    },
  },
});

export const { setRockets, reserveRocket, cancelReservation } =
  rocketsSlice.actions;
export default rocketsSlice.reducer;
