import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SelectedUserAccountService } from '../shared/service/selected-account-service';
import { Account } from '../shared/interfaces/account';
import { Subscription } from 'rxjs';
import { AppService } from '../shared/service/app.service';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  @Input() title: string = '';
  isSidenavOpen: boolean = true;
  selectedAccountID: any;
  selectedAccount: Account | null = null;
  accountList: Account[] = [];
  startDate: Date | null = null;
  endDate: Date | null = null;
  private userAccountsSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private selectedAccountService: SelectedUserAccountService) { }

  ngOnInit(): void {
    this.populateAccounts();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.userAccountsSubscription?.unsubscribe();
  }

  populateAccounts() {
    this.userAccountsSubscription = this.selectedAccountService.getSelectedUserAccounts().subscribe({
      next: response => {
        this.accountList = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

  functionAccountChange(event: any) {
    this.selectedAccountID = event;
    this.selectedAccount = this.accountList.find(account => account.accountID === this.selectedAccountID) || null;
    if (this.selectedAccount) {
      this.selectedAccountService.setSelectedAccount(this.selectedAccount);
    }
  }

  onDateChange(event: any) {
    console.log(event);
  }

  logout() {
    this.selectedAccount = null;
    this.accountList = [];
    this.selectedAccountID = "";
    this.authService.logout();
  }
}
