import React, { Fragment, useEffect, useState } from 'react';
import { Container, List } from 'semantic-ui-react';
import { IActivity } from '../models/activity';
import axios from 'axios';
import NavBar from './NavBar';

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
                <List className="App-header">
                    {activities.map(activity => (
                        <List.Item key={activity.id}>{activity.title}</List.Item>
                    ))}
                </List>
            </Container>
        </Fragment>
    );
}

export default App;
