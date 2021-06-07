import { useEffect, useState } from 'react';
import { v4 as generateUUID } from 'uuid';

const localStorageKey = 'almost-JWT-token';

/**
 * Returns user object
 *
 * In the real application there will be a proper authentication. For example JWT based
 */
export const useUser = () => {
    const [userId, setUserId] = useState<string | undefined>();

    useEffect(() => {
        let uuid = window?.localStorage?.getItem(localStorageKey);
        if (!uuid) {
            uuid = String(generateUUID());
            window?.localStorage?.setItem(localStorageKey, uuid);
        }

        setUserId(uuid);
    }, []);

    return { id: userId };
};