
export class SignupRequest implements SignupRequest {
    constructor() {
        this.name = '';
        this.email = '';
        this.password = '';
        this.phone_number = '';
    }
}

export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    phone_number: string;
}