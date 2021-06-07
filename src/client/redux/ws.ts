import * as ReduxWebSocket from '@giantmachines/redux-websocket';

import { WSRequest } from '../../common/types';

export const connect = (userId: string) => ReduxWebSocket.connect(`${(window as any).wsServerUrl}?token=${userId}`);

export const { disconnect } = ReduxWebSocket;

export const send = (request: WSRequest) => ReduxWebSocket.send(request);
