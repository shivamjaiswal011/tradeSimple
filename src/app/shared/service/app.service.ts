import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private appServiceBaseURL = this.sharedService.getBaseUrl();

    constructor(private http: HttpClient, private sharedService: SharedService) { }

    uploadCsv(params: FormData): Observable<any> {
        return this.http.post<any>(`${this.appServiceBaseURL}/transactions/upload`, params)
    }

    getAccountName(userId: string | null): Observable<any> {
        const url = userId ? `${this.appServiceBaseURL}/accounts/${userId}` : `${this.appServiceBaseURL}/accounts`;
        return this.http.get<any>(url);
    }

    getAllOpenTrades(accountID: string | null): Observable<any> {
        const url = accountID ? `${this.appServiceBaseURL}/trades/open/${accountID}` : `${this.appServiceBaseURL}/trades/open`;
        return this.http.get<any>(url);
    }

    getAllClosedTrades(accountID: string | null): Observable<any> {
        const url = accountID ? `${this.appServiceBaseURL}/trades/closed/${accountID}` : `${this.appServiceBaseURL}/trades/closed`;
        return this.http.get<any>(url);
    }

    getAllTransactionForThisTrade(tradeId: string, tradeType: string): Observable<any> {
        return this.http.get<any>(`${this.appServiceBaseURL}/transactions?tradeId=${tradeId}&tradeType=${tradeType}`)
    }

    createAccount(accountName: string, userId: string): Observable<any> {
        const body = { user_id: userId, account_name: accountName };
        return this.http.post<any>(`${this.appServiceBaseURL}/accounts/create`, JSON.stringify(body));
    }
}