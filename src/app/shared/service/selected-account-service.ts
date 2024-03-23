import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../interfaces/account';
import { User } from '../interfaces/user-info';

@Injectable({
    providedIn: 'root'
})
export class SelectedUserAccountService {

    userAccounts: Account[] | null = [];
    user: User | null = new User();

    private selectedAccountSubject: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
    public selectedAccount$: Observable<Account | null> = this.selectedAccountSubject.asObservable();

    constructor() { }

    setSelectedAccount(account: Account | null): void {
        console.log("setAccount");
        this.selectedAccountSubject.next(account);
    }

    getSelectedAccount(): Observable<Account | null> {
        console.log("getAccount");
        return this.selectedAccount$;
    }
}
