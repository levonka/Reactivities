import React, { Fragment, useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { IActivity } from '../models/activity';
import axios from 'axios';

function App() {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);

    useEffect(() => {
        axios.get<IActivity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data);
        });
    }, []);

    function handleSelectActivity(id: string): void {
        setSelectedActivity(activities.find(x => x.id === id) || null);
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(null);
    }

    return (
        <Fragment>
            <NavBar />

            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                />
            </Container>
        </Fragment>
    );
}

export default App;
