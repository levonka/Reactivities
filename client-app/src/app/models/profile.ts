import { IUser } from './user';

export interface IProfile {
    username: string;
    displayName: string;
    image?: string;
    bio?: string;
}

export class Profile implements IProfile {
    displayName: string;
    username: string;
    image?: string;

    constructor(user: IUser) {
        this.username = user.username;
        this.displayName = user.displayName;
        this.image = user.image;
    }
}
