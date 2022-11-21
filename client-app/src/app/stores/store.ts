import ActivityStore from './activityStore';
import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import UserStore from './userStore';

interface Store {
    commonStore: CommonStore;
    activityStore: ActivityStore;
    userStore: UserStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
