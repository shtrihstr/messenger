import { createMemoryStorage } from './memory';
import { createFakeUsers } from './fakeData';

const storage = createMemoryStorage();

createFakeUsers(storage);

export const { addMessage, getFriendsList, getChats, hasUser, initUser, setOnlineStatus, addFriend } = storage;