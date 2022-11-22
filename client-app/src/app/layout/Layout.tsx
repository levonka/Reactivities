import React from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <React.Fragment>
            <NavBar />

            <Container style={{ marginTop: '7em' }}>
                <Outlet />
            </Container>
        </React.Fragment>
    );
}
