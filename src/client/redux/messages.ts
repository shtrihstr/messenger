import { createAction, createSlice, Draft } from '@reduxjs/toolkit';

import { WSResponse, ChatsMap } from '../../common/types';

export type MessagesState = {
    chats: ChatsMap;
};

const initialState: MessagesState = {
    chats: {}
};

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createAction<{ message: string }>('REDUX_WEBSOCKET::MESSAGE'), (state: Draft<MessagesState>, action) => {
            let response: WSResponse | undefined;
            try {
                response = JSON.parse(action.payload.message) as WSResponse;
            } catch (e) {
                console.error(e);
            }

            if (response?.type === 'init') {
                state.chats = response.data.chats;
            }

            if (response?.type === 'message') {
                const friendId = response.data.friendId;
                if (state.chats[friendId]) {
                    state.chats[friendId].push(response.data.message);
                } else {
                    state.chats[friendId] = [response.data.message];
                }
            }
        });
    }
});
