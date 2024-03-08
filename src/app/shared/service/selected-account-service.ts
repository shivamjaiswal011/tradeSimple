import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../interfaces/account';

@Injectable({
    providedIn: 'root'
})
export class SelectedAccountService {

    private selectedAccountSubject: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
    public selectedAccount$: Observable<Account | null> = this.selectedAccountSubject.asObservable();
    private selectedAccountDetailsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([]);
    public selectedAccountDetails$: Observable<Account[]> = this.selectedAccountDetailsSubject.asObservable();

    constructor() { }

    setSelectedAccount(account: Account | null): void {
        this.selectedAccountSubject.next(account);
    }

    getSelectedAccount(): Observable<Account | null> {
        return this.selectedAccount$;
    }

    setSelectedAccountDetails(accounts: Account[]): void {
        this.selectedAccountDetailsSubject.next(accounts);
    }

    getSelectedAccountDetails(): Observable<Account[]> {
        return this.selectedAccountDetails$;
    }
}
