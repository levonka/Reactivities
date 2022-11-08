import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityList() {
    const { activityStore } = useStore();
    const { deleteActivity, selectActivity, activitiesByDate, loading } = activityStore;

    const [target, setTarget] = useState('');

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activitiesByDate.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as={'a'}>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>
                                    {activity.city}, {activity.venue}
                                </div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    floated="right"
                                    content="View"
                                    color="blue"
                                    onClick={() => selectActivity(activity.id)}
                                />
                                <Button
                                    floated="right"
                                    content="Delete"
                                    color="red"
                                    name={activity.id}
                                    loading={loading && target === activity.id}
                                    onClick={event => handleActivityDelete(event, activity.id)}
                                />
                                <Label basic content={activity.category} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
});
