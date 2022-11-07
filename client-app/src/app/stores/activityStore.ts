import { makeAutoObservable } from 'mobx';
import { IActivity } from '../models/activity';
import agent from '../api/agent';

export default class ActivityStore {
    activities: IActivity[] = [];
    selectedActivity: IActivity | null = null;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadActivities = async () => {
        this.setLoadingInitial(true);

        try {
            const activities = await agent.Activities.list();

            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0];

                this.activities.push(activity);
            });

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    };

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    };

    selectActivity = (id: string) => {
        this.selectedActivity = this.activities.find(a => a.id === id) || null;
    };

    cancelSelectedActivity = () => {
        this.selectedActivity = null;
    };

    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    };

    closeForm = () => {
        this.editMode = false;
    };
}
