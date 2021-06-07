export type Message = {
    from: string;
    text: string;
    timestamp: number;
};

export type ChatsMap = { [key: string]: Message[] };

export type Friend = {
    id: string;
    avatarUrl: string;
    name: string;
    isOnline: boolean;
};

export type FriendsList = {
    friends: Friend[];
    other: Friend[];
};

export type WSResponse = ({
    type: 'init';
    data: WSInitResponseData;
} | {
    type: 'friends';
    data: WSFriendsUpdateResponseData;
} | {
    type: 'message';
    data: WSNewMessageResponseData;
});

export type WSInitResponseData = {
    friendsList: FriendsList;
    chats: ChatsMap;
};

export type WSFriendsUpdateResponseData = {
    friendsList: FriendsList;
};

export type WSNewMessageResponseData = {
    message: Message;
    friendId: string;
};

export type WSRequest = {
    type: 'message';
    data: {
        to: string;
        text: string;
    }
};