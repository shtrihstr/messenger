import { InitUser, AddFriend, SetOnlineStatus, AddMessage } from './interface';

export const createFakeUsers = ({ initUser, setOnlineStatus }: { initUser: InitUser, setOnlineStatus: SetOnlineStatus  }) => {
    initUser('author', 'Oleksandr Strikha', 'https://secure.gravatar.com/avatar/d62efa5305ff0f96a1223a470410652c?s=64');
    initUser('robert-plant', 'Robert Plant', 'http://www.tolkienlibrary.com/press/images/robert-plant.png');
    initUser('jimmy-page', 'Jimmy Page', 'https://a.wattpad.com/useravatar/miamorjimmypage.256.796329.jpg');
    initUser('john-bonham', 'John Bonham', 'https://ultimatedrumming.com/wp-content/uploads/2016/07/042111-Bonham-A.jpg');
    initUser('john-paul-jones', 'John Paul Jones', 'https://ultimatedrumming.com/wp-content/uploads/2016/07/042111-Bonham-A.jpg');

    setOnlineStatus('robert-plant', true);
    setOnlineStatus('jimmy-page', true);
    setOnlineStatus('john-paul-jones', true);
};

export const addFakeFriends = (userId: string, { addFriend, addMessage }: { addFriend: AddFriend, addMessage: AddMessage }) => {
    addFriend(userId, 'author');
    addFriend(userId, 'robert-plant');
    addFriend(userId, 'jimmy-page');
    addFriend(userId, 'john-bonham');
    addFriend(userId, 'john-paul-jones');

    addMessage('author', userId, 'Hello!');

    addMessage('robert-plant', userId, 'All I see turns to brown');
    addMessage('robert-plant', userId, 'As the sun burns the ground');
    addMessage('robert-plant', userId, 'And my eyes fill with sand');
    addMessage('robert-plant', userId, 'As I scan this wasted land');

    addMessage('jimmy-page', userId, 'I called you but you didn\'t answer!');

    addMessage('john-paul-jones', userId, '[censored picture here]');
};
