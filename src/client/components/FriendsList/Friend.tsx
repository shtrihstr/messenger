import * as React from 'react';
import { default as cs } from 'classnames';

import { Friend as FriendType, Message } from '../../../common/types';


type Props = {
    friend: FriendType;
    lastMessage: Message | undefined;
    onSelectFriend: (id: string) => void;
};

export const Friend: React.FC<Props> = ({ friend, lastMessage, onSelectFriend }) => (
    <li
        className={cs('friends-list__item', { 'friends-list__item--offline': !friend.isOnline })}
        onClick={() => onSelectFriend(friend.id)}
    >
        <img className="friends-list__avatar" src={friend.avatarUrl} alt="" />
        <div className="friends-list__col">
            <div className="friends-list__name">{friend.name}</div>
            <div className="friends-list__last-message">{lastMessage?.text || '- - -'}</div>
        </div>
    </li>
);
