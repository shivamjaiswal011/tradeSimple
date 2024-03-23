import { Component, OnInit } from '@angular/core';
import { Account } from '../shared/interfaces/account';
import { SelectedUserAccountService } from '../shared/service/selected-account-service';
import { AppService } from '../shared/service/app.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  accountList: Account[] = [];
  user: any;
  constructor(private userAccountService: SelectedUserAccountService, private appService: AppService) { }

  ngOnInit(): void {
    this.userAccountService.getSelectedUser().subscribe({
      next: response => {
        this.user = response;
      },
      error: error => {
        console.log(error);
      }
    });
    this.userAccountService.getSelectedUserAccounts().subscribe({
      next: response => {
        this.accountList = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  newAccountName: string = '';

  createAccount(): void {
    // Add validation if needed
    if (this.newAccountName.trim()) {
      this.appService.createAccount(this.newAccountName, this.accountList[0].userID).subscribe({
        next: response => {
          console.log(response);
        },
        error: error => {
          console.log(error);
        }
      });
      this.user.accounts.push({ name: this.newAccountName });
      this.newAccountName = '';
    }
  }

}
