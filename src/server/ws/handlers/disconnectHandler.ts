import * as WebSocket from 'ws';
import { Client } from '../types';
import { setOnlineStatus, getFriendsList } from '../storage';
import { broadcast } from './common/broadcast';

export const disconnectHandler = (userId: string, client: Client, server: WebSocket.Server) => {
    setOnlineStatus(userId, false);

    // Notify connected users that you are went offline
    const friendsList = getFriendsList(userId);
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
}