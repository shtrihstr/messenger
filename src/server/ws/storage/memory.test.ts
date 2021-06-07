import { createMemoryStorage } from './memory';
import { addFakeFriends, createFakeUsers } from './fakeData';

describe('Server - ws server - storage - memory - hasUser()', () => {
    it('should return false for non-existing user', () => {
        const storage = createMemoryStorage();
        const result = storage.hasUser('xxx');
        expect(result).toBeFalsy();
    });

    it('should return true for existing user', () => {
        const storage = createMemoryStorage();
        storage.initUser('xxx', 'Name');
        const result = storage.hasUser('xxx');
        expect(result).toBeTruthy();
    });
});

describe('Server - ws server - storage - memory - initUser()', () => {
    it('should create a new user', () => {
        const storage = createMemoryStorage();
        storage.initUser('xxx', 'Name');
        const result = storage.hasUser('xxx');
        expect(result).toBeTruthy();
    });
});

describe('Server - ws server - storage - memory - getFriendsList()', () => {
    const storage = createMemoryStorage();
    createFakeUsers(storage);
    storage.initUser('xxx', 'Name');
    addFakeFriends('xxx', storage);
    storage.initUser('yyy', 'YYYY');
    storage.initUser('zzz', 'ZZZ');
    storage.setOnlineStatus('yyy', true);
    storage.addMessage('zzz', 'xxx', 'Hi!');

    it('should return proper friends', () => {
        const friendsList = storage.getFriendsList('xxx');
        const friendIds = friendsList.friends.map(friend => friend.id);
        expect(friendIds).toContain('author');
        expect(friendIds).toContain('robert-plant');
        expect(friendIds).toContain('jimmy-page');
        expect(friendIds).toContain('john-bonham');
        expect(friendIds).toContain('john-paul-jones');
        expect(friendIds.length).toEqual(5);
    });

    it('should return online users at `other` prop', () => {
        const friendsList = storage.getFriendsList('xxx');
        const ids = friendsList.other.map(friend => friend.id);
        expect(ids).toContain('yyy');
    });

    it('should return offline users with common chat at `other` prop', () => {
        const friendsList = storage.getFriendsList('xxx');
        const ids = friendsList.other.map(friend => friend.id);
        expect(ids).toContain('zzz');
    });
});

describe('Server - ws server - storage - memory - getChats()', () => {
    it('should return all chats', () => {
        const storage = createMemoryStorage();
        storage.initUser('xxx', 'Name');
        storage.initUser('yyy', 'YYY');
        const message = storage.addMessage('xxx', 'yyy', 'Hi!');
        const result = storage.getChats('xxx');
        const expected = {
            'yyy': [{ from: 'xxx', text: 'Hi!', timestamp: message.timestamp }]
        };
        expect(result).toEqual(expected);
    });
});