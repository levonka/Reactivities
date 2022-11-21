import { makeAutoObservable, runInAction } from 'mobx';
import { IUser, IUserFormValues } from '../models/user';
import agent from '../api/agent';
import { store } from './store';

export default class UserStore {
    user: IUser | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (creds: IUserFormValues) => {
        try {
            const user = await agent.Account.login(creds);

            store.commonStore.setToken(user.token);
            runInAction(() => (this.user = user));
        } catch (error) {
            throw error;
        }
    };

    logout = () => {
        store.commonStore.setToken(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
    };
}
