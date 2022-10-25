import React, { useEffect, useState } from 'react';
import { List } from 'semantic-ui-react';
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
        <div className="App">
            <NavBar />

            <List className="App-header">
                {activities.map(activity => (
                    <List.Item key={activity.id}>{activity.title}</List.Item>
                ))}
            </List>
        </div>
    );
}

export default App;
