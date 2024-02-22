import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class SharedService {

    // public showSpinner = new BehaviorSubject<boolean>(false);
    hostName: any = window.location.hostname;

    public getBaseUrl(): string {
        return environment.devUrl;
    }
}