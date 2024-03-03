export class Account implements Account {
    constructor() {
        this.accountName = '';
        this.accountID = '';
    }
}
export interface Account {
    accountName: string;
    accountID: string;
}