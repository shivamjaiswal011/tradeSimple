import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Account } from '../interfaces/account';
import { User } from '../interfaces/user-info';

@Injectable({
    providedIn: 'root'
})
export class SelectedUserAccountService {

    private selectedUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
    public selectedUser$: Observable<User | null> = this.selectedUserSubject.asObservable();
    private selectedAccountSubject: BehaviorSubject<Account | null> = new BehaviorSubject<Account | null>(null);
    public selectedAccount$: Observable<Account | null> = this.selectedAccountSubject.asObservable();
    private selectedUserAccountsSubject: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([]);
    public selectedUserAccounts$: Observable<Account[]> = this.selectedUserAccountsSubject.asObservable();

    constructor() { }

    setSelectedUser(user: User | null): void {
        this.selectedUserSubject.next(user);
    }

    getSelectedUser(): Observable<User | null> {
        return this.selectedUser$;
    }

    setSelectedAccount(account: Account | null): void {
        this.selectedAccountSubject.next(account);
    }

    getSelectedAccount(): Observable<Account | null> {
        return this.selectedAccount$;
    }

    setSelectedUserAccounts(accounts: Account[]): void {
        this.selectedUserAccountsSubject.next(accounts);
    }

    getSelectedUserAccounts(): Observable<Account[]> {
        return this.selectedUserAccounts$;
    }
}
