import * as WebSocket from "ws";

export type Client = WebSocket & { userId: string | undefined };