import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface initialStateDataTypes {
    activeFriendDetails: any
}

const initialState: initialStateDataTypes = {
    activeFriendDetails: {}
}

const friend = createSlice({
    name: "friend",
    initialState,
    reducers: {
        setActiveFriendDetails: (state, action: PayloadAction<any>) => {
            state.activeFriendDetails = action.payload;
        }
    }
});

export const { setActiveFriendDetails } = friend.actions;

export default friend.reducer;

