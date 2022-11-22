import ActivityStore from './activityStore';
import { createContext, useContext } from 'react';
import CommonStore from './commonStore';
import UserStore from './userStore';
import ModalStore from './modalStore';

interface Store {
    commonStore: CommonStore;
    activityStore: ActivityStore;
    userStore: UserStore;
    modalStore: ModalStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    activityStore: new ActivityStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
};

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
