import { Friend, Message, ChatsMap, FriendsList } from '../../../common/types';

import { Storage } from './interface';


export type MemoryStorage = {
    users: UsersMap;
    chats: UsersChat[];
};

export type User = {
    id: string;
    name: string;
    avatarUrl: string;
    isOnline: boolean;
    friendIds: string[];
};

export type UsersChat = {
    participantIds: [string, string];
    messages: Message[];
};

export type UsersMap = { [key: string]: User; };

export const createMemoryStorage = (): Storage => {
    const storage: MemoryStorage = {
        users: {},
        chats: []
    };

    /**
     * Check if users exists
     */
    const hasUser = (userId: string) => userId in storage.users;

    /**
     * Create a new user
     */
    const initUser = (userId: string, name: string, avatarUrl?: string) => {
        storage.users[userId] = {
            id: userId,
            name,
            avatarUrl: avatarUrl || `https://i.pravatar.cc/64?u=${userId}`,
            isOnline: false,
            friendIds: []
        };
    };

    /**
     * Return lists of friends and other people
     */
    const getFriendsList = (userId: string): FriendsList => {
        // Just friends
        const friendIds = storage.users[userId].friendIds;

        // Other people are consists of all currently online users and users with common chat
        const onlineUserIds = Object.values(storage.users)
            .filter(user => user.isOnline && user.id !== userId && !friendIds.includes(user.id))
            .map(user => user.id);
        const userWithCommonChatIds = storage.chats
            .filter(chat => chat.participantIds.includes(userId))
            .map(chat => chat.participantIds.find(id => id !== userId)!)
            .filter(id => !friendIds.includes(id));

        const otherIds = [...onlineUserIds, ...userWithCommonChatIds].filter(filterUnique);

        return {
            friends: friendIds.map(id => formatFriend(storage.users[id])),
            other: otherIds.map(id => formatFriend(storage.users[id]))
        };
    };

    /**
     * Get all existed chats with history
     */
    const getChats = (userId: string): ChatsMap => {
        return storage.chats.reduce<ChatsMap>((map, chat) => {
            if (chat.participantIds.includes(userId)) {
                const participantId = chat.participantIds.find(id => id !== userId)!;
                map[participantId] = chat.messages;
            }
            return map;
        }, {});
    };

    /**
     * Add direct message
     */
    const addMessage = (from: string, to: string, text: string): Message => {
        const message: Message = {
            from,
            text,
            timestamp: Date.now()
        };

        let chat = storage.chats.find(({ participantIds }) => participantIds.includes(from) && participantIds.includes(to));
        if (!chat) {
            chat = {
                participantIds: [from, to],
                messages: []
            };
            storage.chats.push(chat);
        }

        chat.messages.push(message);

        return message;
    };

    /**
     * set user online status
     */
    const setOnlineStatus = (userId: string, isOnline: boolean) => {
        storage.users[userId].isOnline = isOnline;
    };

    /**
     * Add a user to the friends list
     */
    const addFriend = (userId: string, friendId: string) => {
        storage.users[userId].friendIds.push(friendId);
    };

    return {
        hasUser,
        initUser,
        getFriendsList,
        getChats,
        addMessage,
        setOnlineStatus,
        addFriend
    };
};

/**
 * Filter function for making an array unique
 */
const filterUnique = (value: string, index: number, self: string[]): boolean => {
    return self.indexOf(value) === index;
};

/**
 * Convert the user object to the friend object
 */
const formatFriend = (user: User): Friend => ({
    id: user.id,
    avatarUrl: user.avatarUrl,
    name: user.name,
    isOnline: user.isOnline
})