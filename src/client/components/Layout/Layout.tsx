import * as React from 'react';
import { useSelector } from 'react-redux';

import { selectSelectedFriend } from '../../redux';

import { Header } from './Header';
import { FriendsList } from '../FriendsList/FriendsList';
import { Chat } from '../Chat/Chat';

import './Layout.scss';

export const Layout: React.FC = () => {
    const friend = useSelector(selectSelectedFriend);

    return (
        <>
            <Header />
            { friend ? <Chat /> : <FriendsList />  }
        </>
    );
};
