import * as WebSocket from "ws";
import { getFriendsList, getChats, hasUser, initUser, setOnlineStatus, addFriend, addMessage } from '../storage';
import { getRandomName } from './common/randomName';
import { broadcast } from './common/broadcast';
import { WSResponse } from '../../../common/types';
import { Client } from '../types';
import { addFakeFriends } from '../storage/fakeData';

export const connectionHandler = (userId: string, client: Client, server: WebSocket.Server) => {
    if (!hasUser(userId)) {
        initUser(userId, getRandomName());
        // Because it's sad to not have friends ;(
        addFakeFriends(userId, { addFriend, addMessage } );
    }

    setOnlineStatus(userId, true);

    const friendsList = getFriendsList(userId);
    const response: WSResponse = {
        type: 'init',
        data: {
            friendsList,
            chats: getChats(userId)
        }
    };

    // Send initial data (friends, chats history) to the client
    client.send(JSON.stringify(response));

    // Notify all connected users that you are online now!
    const connectedUserIds = [
        ...friendsList.friends.map(friend => friend.id),
        ...friendsList.other.map(friend => friend.id)
    ];
    broadcast(server, connectedUserIds, id => ({
        type: 'friends',
        data: {
            friendsList: getFriendsList(id)
        }
    }));
};
