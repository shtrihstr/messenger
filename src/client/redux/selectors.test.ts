import { selectFriendsList, selectLastMessages, selectSelectedFriend, selectSelectedFriendMessages } from './selectors';
import { RootState } from './store';

describe('Client - redux - selectors - selectSelectedFriend', () => {
    it('should return proper fiendId', () => {
        const store1: RootState = {
            friends: {
                friends: [],
                other: [],
                selectedFriendId: undefined
            },
            messages: {
                chats: {}
            }
        };

        const friend = {
            id: 'xxx',
            avatarUrl: 'avatarUrl',
            name: 'name',
            isOnline: false
        };

        const store2 = {
            friends: {
                friends: [friend],
                other: [],
                selectedFriendId: 'xxx'
            },
            messages: {
                chats: {}
            }
        };
        expect(selectSelectedFriend(store1)).toBeUndefined();
        expect(selectSelectedFriend(store2)).toEqual(friend);
    });
});

describe('Client - redux - selectors - selectFriendsList', () => {
    it('should return proper list', () => {
        const friend = {
            id: 'xxx',
            avatarUrl: 'avatarUrl',
            name: 'name',
            isOnline: false
        };

        const randomPerson = {
            id: 'yyy',
            avatarUrl: 'avatarUrl',
            name: 'name',
            isOnline: false
        };

        const store = {
            friends: {
                friends: [friend],
                other: [randomPerson],
                selectedFriendId: undefined
            },
            messages: {
                chats: {}
            }
        };

        const expected = {
            friends: [friend],
            other: [randomPerson]
        };

        expect(selectFriendsList(store)).toEqual(expected);
    });
});

describe('Client - redux - selectors - selectLastMessages', () => {
    it('should return proper messages map', () => {
        const store = {
            friends: {
                friends: [],
                other: [],
                selectedFriendId: undefined
            },
            messages: {
                chats: {
                    xxx: [
                        { from: 'xxx', text: 'hi', timestamp: 0 },
                        { from: 'yyy', text: 'YO!', timestamp: 1 }
                    ]
                }
            }
        };

        const expected = {
            xxx:  { from: 'yyy', text: 'YO!', timestamp: 1 }
        };

        expect(selectLastMessages(store)).toEqual(expected);
    });
});

describe('Client - redux - selectors - selectSelectedFriendMessages', () => {
    it('should return proper messages map', () => {
        const store = {
            friends: {
                friends: [],
                other: [],
                selectedFriendId: 'xxx'
            },
            messages: {
                chats: {
                    xxx: [
                        { from: 'xxx', text: 'hi', timestamp: 0 },
                        { from: 'yyy', text: 'YO!', timestamp: 1 }
                    ]
                }
            }
        };

        const expected = [
            { from: 'xxx', text: 'hi', timestamp: 0 },
            { from: 'yyy', text: 'YO!', timestamp: 1 }
        ];

        expect(selectSelectedFriendMessages(store)).toEqual(expected);
    });
});