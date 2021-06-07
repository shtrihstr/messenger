import { Friend, Message, FriendsList } from '../../common/types';

import { RootState } from './store';

export const selectSelectedFriend = (state: RootState) => {
    if (!state.friends.selectedFriendId) {
        return undefined;
    }

    return state.friends.friends.find(friend => friend.id === state.friends.selectedFriendId) ||
        state.friends.other.find(friend => friend.id === state.friends.selectedFriendId);
};

export const selectSelectedFriendMessages = (state: RootState) => {
    if (!state.friends.selectedFriendId) {
        return [];
    }

    return state.messages.chats[state.friends.selectedFriendId] || [];
};

export const selectFriendsList = (state: RootState): FriendsList => ({
    friends: [...state.friends.friends].sort(sortByOnline),
    other: [...state.friends.other].sort(sortByOnline)
});

export const selectLastMessages = (state: RootState) => {
    return Object.entries(state.messages.chats).reduce<{ [key: string]: Message }>((map, [friendId, messages]) => {

        const message = [...messages].reverse()[0];
        if (message) {
            map[friendId] = message;
        }
        return map;
    }, {});
};

const sortByOnline = (friend1: Friend, friend2: Friend) => {
    if (friend1.isOnline === friend2.isOnline) {
        return 0;
    }

    return friend1.isOnline ? -1 : 1;
};
