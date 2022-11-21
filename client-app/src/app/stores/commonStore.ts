import { IServerError } from '../models/serverError';
import { makeAutoObservable } from 'mobx';

export default class CommonStore {
    error: IServerError | null = null;
    token: string | null = null;
    appLoaded = false;

    constructor() {
        makeAutoObservable(this);
    }

    setServerError = (error: IServerError) => {
        this.error = error;
    };

    setToken = (token: string | null) => {
        if (token) {
            window.localStorage.setItem('jwt', token);
            this.token = token;
        }
    };

    setAppLoaded = () => {
        this.appLoaded = true;
    };
}
