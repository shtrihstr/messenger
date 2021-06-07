import * as React from 'react';

import { selectSelectedFriend, selectSelectedFriendMessages, useAppSelector, useAppDispatch, setSelectedFriendId } from '../../redux';

import { Form } from './Form';
import { Message } from './Message';
import './Chat.scss';

export const Chat: React.FC = () => {
    const friend = useAppSelector(selectSelectedFriend);
    const messages = useAppSelector(selectSelectedFriendMessages);
    const dispatch = useAppDispatch();
    const bottomRef = React.useRef<HTMLDivElement>(null);

    const returnToFriendsListAction = () => dispatch(setSelectedFriendId(undefined));

    React.useEffect(() => {
        bottomRef.current?.scrollIntoView();
    }, [messages]);

    if (!friend) {
        return null;
    }

    return (
        <main className="chat-view">
            <header className="chat-header">
                <button type="button" className="chat-header__back" onClick={returnToFriendsListAction}>&lt;</button>
                <img className="chat-header__avatar" src={friend.avatarUrl} alt="" />
                <h2 className="chat-header__name">{friend.name}</h2>
            </header>

            <ul className="chat">
                {messages.map(message => <Message message={message} friendId={friend.id} /> )}
            </ul>
            <div ref={bottomRef} />

            <Form friendId={friend.id} />
        </main>
    );
};
