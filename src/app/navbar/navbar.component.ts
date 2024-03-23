import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SelectedUserAccountService } from '../shared/service/selected-account-service';
import { Account } from '../shared/interfaces/account';
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
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private authService: AuthService, protected userAccountService: SelectedUserAccountService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
  }

  functionAccountChange(event: any) {
    this.selectedAccountID = event;
    this.selectedAccount = this.userAccountService.userAccounts?.find(account => account.accountID === this.selectedAccountID) || null;
    if (this.selectedAccount) {
      this.userAccountService.setSelectedAccount(this.selectedAccount);
    }
  }

  onDateChange(event: any) {
    console.log(event);
  }

  logout() {
    this.userAccountService.setSelectedAccount(null);
    this.userAccountService.user = null;
    this.userAccountService.userAccounts = [];
    this.authService.logout();
  }
}
