import { Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <Container style={{ marginTop: '7rem' }}>
            <h1>Home page</h1>
            <h3>
                Go to <Link to="/activities">Activities</Link>
            </h3>
        </Container>
    );
}
