import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/service/auth.service';
import { AppService } from './shared/service/app.service';
import { Account } from './shared/interfaces/account';
import { TradeService } from './shared/service/trade.service';
import { Subscription } from 'rxjs';
import { SelectedUserAccountService } from './shared/service/selected-account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpen: boolean = true;
  title: string = 'Trade Simple';
  isAuthenticated: boolean = false;
  accounts: Account[] = [];

  private selectedAccountSubscription: Subscription | undefined;
  private userAccountsSubscription: Subscription | undefined;
  private userAuthenticationSubscription: Subscription | undefined;
  constructor(private authService: AuthService, private appService: AppService, private userAccountService: SelectedUserAccountService, private tradeService: TradeService, private router: Router) { }

  ngOnInit(): void {
    this.isUserAuthentic();
    this.selectedAccountSubscription = this.userAccountService.getSelectedAccount().subscribe(response => {
      if (response != null) {
        console.log(response);
        this.tradeService.initializeTradesData(response);
      }
      else {
        this.tradeService.cleanTradesData();
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.userAuthenticationSubscription?.unsubscribe();
    this.selectedAccountSubscription?.unsubscribe();
    this.userAccountsSubscription?.unsubscribe();
  }

  isUserAuthentic() {
    this.userAuthenticationSubscription = this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated) {
        this.setUserAccounts();
      } else {
        this.tradeService.cleanTradesData();
      }
    });
  }

  setUserAccounts() {
    const userId = this.userAccountService.user?.userId ? (this.userAccountService.user?.userId) : null;
    this.userAccountsSubscription = this.appService.getAccountName(userId).subscribe({
      next: response => {
        if (response.Account) {
          console.log(response);
          this.accounts = response.Account.map((element: any) => this.createAccountObject(element));
          this.userAccountService.userAccounts = this.accounts;
        }
      },
      error: err => {
        console.log("error", err)
      }
    });
  }

  createAccountObject(account: any): Account {
    return {
      accountID: account.account_id,
      accountName: account.account_name,
      userID: account.user_id,
      lastImportFromDate: account.last_import_from_date,
      lastImportToDate: account.last_import_to_date
    };
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
  }
}
