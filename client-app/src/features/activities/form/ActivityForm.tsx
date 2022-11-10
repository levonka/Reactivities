import { Button, Form, Segment } from 'semantic-ui-react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import { IActivity } from '../../../app/models/activity';
import LoadingComponent from '../../../app/layout/LoadingComponent';

export default observer(function ActivityForm() {
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: '',
    });

    useEffect(() => {
        if (id) {
            loadActivity(id).then(activity => setActivity(activity as IActivity));
        }
    }, [id, loadActivity]);

    function handleSubmit() {
        activity.id ? updateActivity(activity) : createActivity(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;

        setActivity({ ...activity, [name]: value });
    }

    if (loadingInitial) {
        return <LoadingComponent content="Loading activity..." />;
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
                <Button floated="right" positive type="submit" content="Submit" loading={loading} />
                <Button floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    );
});
