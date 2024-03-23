import { Component, OnDestroy, OnInit } from '@angular/core';
import { Account } from '../shared/interfaces/account';
import { SelectedUserAccountService } from '../shared/service/selected-account-service';
import { AppService } from '../shared/service/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  selectedAccountSubscription: Subscription | undefined;
  constructor(protected userAccountService: SelectedUserAccountService, private appService: AppService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.selectedAccountSubscription?.unsubscribe();
  }

  newAccountName: string = '';

  createAccount(): void {
    // Add validation if needed
    if (this.newAccountName.trim()) {
      const user: string = this.userAccountService.user?.userId ? (this.userAccountService.user?.userId) : "";
      this.selectedAccountSubscription = this.appService.createAccount(this.newAccountName, user).subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log(error);
        }
      });
      this.newAccountName = '';
    }
  }

}
