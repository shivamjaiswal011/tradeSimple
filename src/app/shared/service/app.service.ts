import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AppService {

    private appServiceBaseURL = this.sharedService.getBaseUrl();

    constructor(private http: HttpClient, private sharedService: SharedService) { }

    uploadCsv(data: FormData) {
        this.http.post<any>(`${this.appServiceBaseURL}/tradebooks/upload`, data)
            .subscribe({
                next: response => {
                    console.log('File uploaded successfully:', response);
                    // Handle response from backend as needed
                },
                error: error => {
                    console.error('Error uploading file:', error);
                    // Handle error
                }
            });

    }
}