import { RootState } from '../rootReducer';
import { createSelector } from '@reduxjs/toolkit'

export const driversSelector = (state: RootState) => state.drivers
export const getAllDrivers = createSelector(
  driversSelector,
  (state) => state.drivers
)
