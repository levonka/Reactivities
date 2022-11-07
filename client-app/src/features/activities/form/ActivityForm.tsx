import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import { ChangeEvent, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

interface Props {
    createOrEdit: (activity: IActivity) => void;
    submitting: boolean;
}

export default observer(function ActivityForm({ createOrEdit, submitting }: Props) {
    const { activityStore } = useStore();
    const { selectedActivity, closeForm } = activityStore;

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
        createOrEdit(activity);
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
                <Form.Input
                    placeholder="Date"
                    name="date"
                    type="date"
                    value={activity.date}
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder="City"
                    name="city"
                    value={activity.city}
                    onChange={handleInputChange}
                />
                <Form.Input
                    placeholder="Venue"
                    name="venue"
                    value={activity.venue}
                    onChange={handleInputChange}
                />
                <Button
                    floated="right"
                    positive
                    type="submit"
                    content="Submit"
                    loading={submitting}
                />
                <Button
                    floated="right"
                    type="button"
                    content="Cancel"
                    onClick={() => closeForm()}
                />
            </Form>
        </Segment>
    );
});
