import * as WebSocket from 'ws';
import { addMessage } from '../storage';
import { WSRequest } from '../../../common/types';
import { Client } from '../types';
import { broadcast } from './common/broadcast';

export const incomeMessageHandler = (data: WebSocket.Data, userId: string, client: Client, server: WebSocket.Server) => {
    let request: WSRequest;
    try {
        request = JSON.parse(String(data)) as WSRequest;
    } catch (e) {
        console.error(e);
        return;
    }

    // At the current moment, we are expecting only one type: message
    if (request.type === 'message') {
        const message = addMessage(userId, request.data.to, request.data.text);
        broadcast(server, [userId, request.data.to], id => ({
            type: 'message',
            data: {
                message,
                friendId: id === userId ? request.data.to : userId
            }
        }));

    } else {
        console.error(`Unsupported income message: ${data}`);
    }
};
