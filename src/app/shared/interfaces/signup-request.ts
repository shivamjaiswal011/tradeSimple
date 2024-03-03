
export class SignupRequest implements SignupRequest {
    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.phoneNumber = '';
    }
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}