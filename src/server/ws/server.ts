import * as qs from 'querystring';
import * as WebSocket from 'ws';
import * as config  from 'config';

import { Client } from './types';
import { connectionHandler } from './handlers/connectionHandler';
import { incomeMessageHandler } from './handlers/incomeMessageHandler';
import { disconnectHandler } from './handlers/disconnectHandler';

/**
 * Creates WebSocket server
 *
 * The single node WS server is not a good idea for the real world application.
 * It should be changed by horizontally scalable solution.
 * Also protocol might be changed to more reliable, for example MQTT.
 */
export const createWSServer = () => {
    const server = new WebSocket.Server({
        host: '0.0.0.0',
        port: config.get('server.ws.port')
    });

    server.on('connection', (ws, req) => {
        let userId: string | undefined;
        try {
            // Let's imagine a JWT token validation here
            userId = parseUserId(req.url || '');
        } catch (e) {
            console.error(e);
        }

        if (!userId) {
            return ws.close();
        }

        const client = ws as Client;
        client.userId = userId;

        ws.on('message', (message) => incomeMessageHandler(message, userId!, client, server));
        ws.on('close', (code, reason) => disconnectHandler(userId!, client, server));

        connectionHandler(userId!, client, server);
    });
};

export const parseUserId = (url: string) => {
    const query = url.split('?')[1] || '';
    const { token } = qs.parse(query);
    return Array.isArray(token) ? token[0] : token;
};