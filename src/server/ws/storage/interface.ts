import { Message, FriendsList, ChatsMap } from '../../../common/types';

export type HasUser = (userId: string) => boolean;
export type InitUser = (userId: string, name: string, avatarUrl?: string) => void;
export type GetFriendsList = (userId: string) => FriendsList;
export type GetChats = (userId: string) => ChatsMap;
export type AddMessage = (from: string, to: string, text: string) => Message;
export type SetOnlineStatus = (userId: string, isOnline: boolean) => void;
export type AddFriend = (userId: string, friendId: string) => void;

export interface Storage {
    hasUser: HasUser;
    initUser: InitUser;
    getFriendsList: GetFriendsList;
    getChats: GetChats;
    addMessage: AddMessage;
    setOnlineStatus: SetOnlineStatus;
    addFriend: AddFriend;
}