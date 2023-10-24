import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDriver } from '../../api';

interface DriversState {
  drivers: IDriver[];
}

const initialState: DriversState = {
  drivers: [],
};

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    setDrivers(state, action: PayloadAction<IDriver[]>) {
      state.drivers = action.payload;
    },
    updateDriverState(state, action: PayloadAction<IDriver>) {
      const updatedDriver = action.payload;
      const index = state.drivers.findIndex(driver => driver._id === updatedDriver._id);
      if (index !== -1) {
        state.drivers[index] = updatedDriver;
      }
    },
  },
});

export const { setDrivers, updateDriverState } = driversSlice.actions;
export default driversSlice.reducer;
