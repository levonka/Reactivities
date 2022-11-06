import React, { Fragment, useEffect, useState } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { IActivity } from '../models/activity';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';

function App() {
    const [activities, setActivities] = useState<IActivity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        agent.Activities.list().then(data => {
            let activities: IActivity[] = data.map(activity => {
                activity.date = activity.date.split('T')[0];

                return activity;
            });

            setActivities(activities);
        });
    }, []);

    function handleSelectActivity(id: string): void {
        setSelectedActivity(activities.find(x => x.id === id) || null);
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(null);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditActivity(activity: IActivity) {
        activity.id
            ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
            : setActivities([...activities, { ...activity, id: uuid() }]);

        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter(x => x.id !== id)]);
    }

    return (
        <Fragment>
            <NavBar openForm={handleFormOpen} />

            <Container style={{ marginTop: '7em' }}>
                <ActivityDashboard
                    activities={activities}
                    selectedActivity={selectedActivity}
                    selectActivity={handleSelectActivity}
                    cancelSelectActivity={handleCancelSelectActivity}
                    editMode={editMode}
                    openForm={handleFormOpen}
                    closeForm={handleFormClose}
                    createOrEdit={handleCreateOrEditActivity}
                    deleteActivity={handleDeleteActivity}
                />
            </Container>
        </Fragment>
    );
}

export default App;