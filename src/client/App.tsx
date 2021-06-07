import * as React from 'react';

import { useAppDispatch, ws } from './redux';
import { useUser } from './hooks/useUser';
import { Layout } from './components/Layout/Layout';

export const App: React.FC = () => {
    const user = useUser();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (!user.id) {
            return;
        }
        dispatch(ws.connect(user.id));

        return () => { dispatch(ws.disconnect()); };
    }, [user.id, dispatch]);

    return <Layout />;
};
