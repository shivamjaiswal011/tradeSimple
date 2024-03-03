import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SelectedAccountService {
    private selectedAccountSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
    public selectedAccount$: Observable<string | null> = this.selectedAccountSubject.asObservable();

    constructor() { }

    setSelectedAccount(accountId: string | null): void {
        this.selectedAccountSubject.next(accountId);
    }

    getSelectedAccount(): Observable<string | null> {
        return this.selectedAccount$;
    }
}
