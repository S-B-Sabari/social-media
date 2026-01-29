import { configureStore } from '@reduxjs/toolkit'
import listingReducer from './features/listingSlice'

export const store = configureStore({
  reducer: {
    // Ensure listingReducer is correctly exported from its file
    listing: listingReducer
  }
})