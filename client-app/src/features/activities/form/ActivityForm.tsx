import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { ChangeEvent, useState } from 'react';

interface Props {
    activity: IActivity | null;
    closeForm: () => void;
}

export default function ActivityForm({ activity: selectedActivity, closeForm }: Props) {
    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    };

    const [activity, setActivity] = useState(initialState);

    function handleSubmit() {
        console.log(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setActivity({ ...activity, [name]: value });
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input
                    placeholder="Title"
                    name="title"
                    value={activity.title}
                    onChange={handleInputChange}
                />
                <Form.TextArea
                    placeholder="Description"
                    name="description"
                    value={activity.description}
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder="Category"
                    name="category"
                    value={activity.category}
                    onChange={handleInputChange}
                />
                <Form.Input placeholder="Date" value={activity.date} onChange={handleInputChange} />
                <Form.Input placeholder="City" value={activity.city} onChange={handleInputChange} />
                <Form.Input
                    placeholder="Venue"
                    name="venue"
                    value={activity.venue}
                    onChange={handleInputChange}
                />
                <Button floated="right" positive type="submit" content="Submit" />
                <Button
                    floated="right"
                    type="button"
                    content="Cancel"
                    onClick={() => closeForm()}
                />
            </Form>
        </Segment>
    );
}
