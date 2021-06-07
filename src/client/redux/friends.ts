import { createSlice, Draft, createAction } from '@reduxjs/toolkit';

import { Friend, WSResponse } from '../../common/types';

export type FriendsState = {
    friends: Friend[];
    other: Friend[];
    selectedFriendId: string | undefined;
};

const initialState: FriendsState = {
    friends: [],
    other: [],
    selectedFriendId: undefined
};

export const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        setSelectedFriendId(state: Draft<FriendsState>, action) {
            state.selectedFriendId = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createAction<{ message: string }>('REDUX_WEBSOCKET::MESSAGE'), (state: Draft<FriendsState>, action) => {
            try {
                const response = JSON.parse(action.payload.message) as WSResponse;
                if (response.type === 'init' || response.type === 'friends') {
                    state.friends = response.data.friendsList.friends;
                    state.other = response.data.friendsList.other;
                }
            } catch (e) {
                console.error(e);
            }
        });
    }
});

export const { setSelectedFriendId } = friendsSlice.actions;
