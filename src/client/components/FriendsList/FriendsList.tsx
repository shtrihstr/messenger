import * as React from 'react';

import {
    selectFriendsList,
    useAppSelector,
    useAppDispatch,
    setSelectedFriendId,
    selectLastMessages
} from '../../redux';

import { Friend } from './Friend';
import './FriendsList.scss';


export const FriendsList: React.FC = () => {
    const friendsList = useAppSelector(selectFriendsList);
    const lastMessages = useAppSelector(selectLastMessages);
    const dispatch = useAppDispatch();

    return (
        <main className="friends-view">
            <h4 className="section-title">Close Friends</h4>
            <ul className="friends-list">
                {friendsList.friends.map(friend => <Friend friend={friend} lastMessage={lastMessages[friend.id]} onSelectFriend={() => dispatch(setSelectedFriendId(friend.id))} />)}
            </ul>
            { friendsList.other.length > 0 && (
                <>
                    <h4 className="section-title">Strangers Online</h4>
                    {friendsList.other.map(friend => <Friend friend={friend} lastMessage={lastMessages[friend.id]} onSelectFriend={() => dispatch(setSelectedFriendId(friend.id))} />)}
                </>
            ) }
        </main>
    );
};
