import * as React from 'react';
import { default as cs } from 'classnames';

import { Message as MessageType } from '../../../common/types';

type Props = {
    message: MessageType;
    friendId: string;
};

export const Message: React.FC<Props> = ({ message, friendId }) => (
    <li className={cs('chat__item', { 'chat__item--outcome': message.from !== friendId })}>
        {message.text}
    </li>
);

