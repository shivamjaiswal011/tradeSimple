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
  selectedAccountID: any;
  selectedAccount: Account = new Account();
  accountList: Account[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;


  constructor(private authService: AuthService, private appService: AppService, private selectedAccountService: SelectedAccountService) { }

  ngOnInit(): void {
    this.selectedAccountService.getSelectedAccountDetails().subscribe({
      next: response => {
        this.accountList = response;
      },
      error: error => {
        console.log(error);
      }
    })

  }

  functionAccountChange(event: any) {
    this.selectedAccountID = event;
    this.accountList.forEach((account: Account) => {
      if (account.accountID == this.selectedAccountID) {
        this.selectedAccount = account;
      }
    })
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
