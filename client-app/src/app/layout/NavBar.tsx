import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

export default observer(function NavBar() {
    const { activityStore } = useStore();
    const { openForm } = activityStore;

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to="/" header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '1rem' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name="Activities" />
                <Menu.Item>
                    <Button
                        as={NavLink}
                        to="/createActivity"
                        positive
                        content="Create Activity"
                        onClick={() => openForm()}
                    />
                </Menu.Item>
            </Container>
        </Menu>
    );
});
