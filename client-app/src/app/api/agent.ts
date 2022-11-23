import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ActivityFormValues, IActivity } from '../models/activity';
import { toast } from 'react-toastify';
import { store } from '../stores/store';
import { IUser, IUserFormValues } from '../models/user';

const sleep = (delay: number) => {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
};

axios.defaults.baseURL = 'http://localhost:5000/api/';

axios.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = store.commonStore.token;

    if (token) {
        config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    async response => {
        await sleep(500);
        return response;
    },
    (error: AxiosError) => {
        const { data, status, config } = error.response as AxiosResponse;

        switch (status) {
            case 400:
                if (typeof data === 'string') {
                    toast.error(data);
                }
                if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                    // redirect (doesn't work in new router)
                }
                if (data.errors) {
                    const modalStateErrors = [];

                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modalStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modalStateErrors.flat();
                }
                break;
            case 401:
                toast.error('unauthorised');
                break;
            case 404:
                toast.error('not found');
                break;
            case 500:
                store.commonStore.setServerError(data);
                // redirect (doesn't work in new router)
                break;
        }
        return Promise.reject(error);
    }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: object) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

const Activities = {
    list: () => requests.get<IActivity[]>('activities'),
    details: (id: string) => requests.get<IActivity>(`activities/${id}`),
    create: (activity: ActivityFormValues) => requests.post<void>(`activities`, activity),
    update: (activity: ActivityFormValues) =>
        requests.put<void>(`activities/${activity.id}`, activity),
    delete: (id: string) => requests.delete<void>(`activities/${id}`),
    attend: (id: string) => requests.post<void>(`activities/${id}/attend`, {}),
};

const Account = {
    current: () => requests.get<IUser>('account'),
    login: (user: IUserFormValues) => requests.post<IUser>('account/login', user),
    register: (user: IUserFormValues) => requests.post<IUser>('account/register', user),
};

const agent = {
    Activities,
    Account,
};

export default agent;
