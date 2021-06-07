import * as React from 'react';

import { useAppDispatch, ws } from '../../redux';

type Props = {
    friendId: string;
};

export const Form: React.FC<Props> = ({ friendId }) => {
    const [text, setText] = React.useState<string>('');
    const dispatch = useAppDispatch();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text !== '') {
            dispatch(ws.send({
                type: 'message',
                data: {
                    text,
                    to: friendId
                }
            }));
            setText('');
        }
    };

    return (
        <form className="message-form" onSubmit={onSubmit}>
            <input
                className="message-form__input"
                type="text"
                tabIndex={0}
                value={text}
                onChange={e => setText(e.target.value)}
                autoFocus
            />
            <button
                className="message-form__button"
                type="submit"
                disabled={text === ''}
                title="Send"
                tabIndex={1}
            >&#10148;</button>
        </form>
    );
};

