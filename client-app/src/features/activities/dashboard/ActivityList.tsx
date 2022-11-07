import React, { SyntheticEvent, useState } from 'react';
import { IActivity } from '../../../app/models/activity';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    activities: IActivity[];
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityList({ activities, deleteActivity, submitting }: Props) {
    const { activityStore } = useStore();
    const [target, setTarget] = useState('');

    function handleActivityDelete(event: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(event.currentTarget.name);
        deleteActivity(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
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
                                    onClick={() => activityStore.selectActivity(activity.id)}
                                />
                                <Button
                                    floated="right"
                                    content="Delete"
                                    color="red"
                                    name={activity.id}
                                    loading={submitting && target === activity.id}
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
