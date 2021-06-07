import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import reduxWebsocket from '@giantmachines/redux-websocket';

import { friendsSlice } from './friends';
import { messagesSlice } from './messages';

export const store = configureStore({
    reducer: {
        friends: friendsSlice.reducer,
        messages: messagesSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(reduxWebsocket())
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;