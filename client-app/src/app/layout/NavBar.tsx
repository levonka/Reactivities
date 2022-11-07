import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function NavBar() {
    const { activityStore } = useStore();

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: '1rem' }} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button
                        positive
                        content="Create Activity"
                        onClick={() => activityStore.openForm()}
                    />
                </Menu.Item>
            </Container>
        </Menu>
    );
});
