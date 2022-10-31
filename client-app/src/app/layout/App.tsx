import React, { Fragment, useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { IActivity } from '../models/activity';
import axios from 'axios';

function App() {
    const [activities, setActivities] = useState<IActivity[]>([]);

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data);
        });
    }, []);

    return (
        <Fragment>
            <NavBar />

            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard activities={activities} />
            </Container>
        </Fragment>
    );
}

export default App;
