export class Account implements Account {
    constructor() {
        this.accountName = '';
        this.accountID = '';
        this.userID = '';
        this.lastImportFromDate = '';
        this.lastImportToDate = '';
    }
}
export interface Account {
    accountName: string;
    accountID: string;
    userID: string;
    lastImportFromDate: string
    lastImportToDate: string
}