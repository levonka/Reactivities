import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';

function App() {
    return (
        <React.Fragment>
            <NavBar />

            <Container style={{ marginTop: '7em' }}>
                <Outlet />
            </Container>
        </React.Fragment>
    );
}

export default observer(App);
