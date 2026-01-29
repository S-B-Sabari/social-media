import { createSlice } from "@reduxjs/toolkit"; 
import { dummyListings } from "../../assets/assets"; 

const listingSlice = createSlice({
    name: "listing",
    initialState: {
        listings: dummyListings,
        userListings: dummyListings,
        balance: {
            earned: 0,
            withdrawn: 0,
            available: 0
        }
    },
    reducers: {
        // Renamed from serListings to setListings
        setListings: (state, action) => {
            state.listings = action.payload;
        }
    }
})

// Export the corrected action name
export const { setListings } = listingSlice.actions;

export default listingSlice.reducer;