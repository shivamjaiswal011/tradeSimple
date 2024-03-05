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
}