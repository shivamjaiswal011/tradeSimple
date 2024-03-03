export class User implements User {
    constructor() {
        this.userId = '';
        this.email = '';
        this.password = '';
        this.phoneNumber = '';
        this.createdAt = '';
        this.updatedAt = '';

    }
}
export interface User {
    email: string
    password: string;
    phoneNumber: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}