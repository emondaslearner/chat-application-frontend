import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataTypes {
    friendRequests: any;
}

const initialState: DataTypes = {
    friendRequests: [],
};

const friendRequest = createSlice({
    name: "friendRequest",
    initialState,
    reducers: {
        setFriendRequests: (state, action: PayloadAction<any>) => {
            state.friendRequests = [...state.friendRequests, ...action.payload];
        },
        deleteFriendRequestFromStore: (state, action: PayloadAction<number>) => {
            const list = [...state.friendRequests];
            list.splice(action.payload, 1);

            state.friendRequests = list;
        }
    },
});

export const { setFriendRequests, deleteFriendRequestFromStore } = friendRequest.actions;
export default friendRequest.reducer;
