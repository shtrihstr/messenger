import * as React from 'react';

import './Header.scss';

export const Header: React.FC = () => (
    <header className="app-header">
        <h1 className="app-header__title">Messenger</h1>
        <div className="app-header__hero">Be closer to your corona friends</div>
    </header>
);
