import * as WebSocket from 'ws';

import { Client } from '../../types';
import { WSResponse } from '../../../../common/types';

export const broadcast = (server: WebSocket.Server, userIds: string[], callback: (userId: string) => WSResponse) => {
    server.clients.forEach(ws => {
        const client = ws as Client;
        const userId = client.userId;
        if (!userId) {
            return;
        }

        if (userIds.includes(userId) && client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(callback(userId)));
        }
    });
};
