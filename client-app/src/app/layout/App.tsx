import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';

function App() {
    const { commonStore, userStore } = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded) {
        return <LoadingComponent content="Loading app..." />;
    }

    return (
        <>
            <ToastContainer position="bottom-right" hideProgressBar />
            <React.Fragment>
                <NavBar />

                <Container style={{ marginTop: '7em' }}>
                    <Outlet />
                </Container>
            </React.Fragment>
        </>
    );
}

export default observer(App);
