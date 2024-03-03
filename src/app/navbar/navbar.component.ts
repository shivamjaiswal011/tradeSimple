import { Account } from './../shared/interfaces/account';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { AppService } from '../shared/service/app.service';
import { SelectedAccountService } from '../shared/service/selected-account-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string = '';
  isSidenavOpen: boolean = true;
  selectedAccount: any;
  accountList: Account[] = [];
  accountForm = new FormControl('');
  startDate: Date | null = null;
  endDate: Date | null = null;
  userId: string | null = null;

  constructor(private authService: AuthService, private appService: AppService, private selectedAccountService: SelectedAccountService) { }

  ngOnInit(): void {

    //subscribe to apiService.getAccount()
    this.userId = this.authService.getUserId();
    this.appService.getAccountName(this.userId).subscribe({
      next: response => {
        if (response.Account) {
          response.Account.forEach((element: any) => {
            this.accountList.push({ accountID: element.account_id, accountName: element.account_name })
          });
        }
      },
      error: err => {
        console.log("error", err)
      }
    });

  }

  functionAccountChange(event: any) {
    console.log(this.selectedAccount, event);
    this.selectedAccount = event;
    this.selectedAccountService.setSelectedAccount(this.selectedAccount);
  }

  onDateChange(event: any) {
    console.log(event);
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
  }


}
