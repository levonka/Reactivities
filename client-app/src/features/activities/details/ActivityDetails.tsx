import { Button, Card, Image } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface Props {
    activity: IActivity;
    cancelSelectActivity: () => void;
}

export default function ActivityDetails({ activity, cancelSelectActivity }: Props) {
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
                    <Button
                        basic
                        color="grey"
                        content="Cancel"
                        onClick={() => cancelSelectActivity()}
                    ></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    );
}
