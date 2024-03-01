
export class LoginRequest implements LoginRequest {
    constructor() {
        this.email = '';
        this.password = '';
    }
}
export interface LoginRequest {
    email: string
    password: string
}