import { Button, Card, Image } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

export default observer(function ActivityDetails() {
    const { activityStore } = useStore();
    const { selectedActivity: activity } = activityStore;

    if (!activity) return null;

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>{activity.date}</Card.Meta>
                <Card.Description>{activity.description}</Card.Description>
            </Card.Content>
            <Card.Content>
                <Button.Group widths="2">
                    <Button basic color="blue" content="Edit"></Button>
                    <Button basic color="grey" content="Cancel"></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
});
