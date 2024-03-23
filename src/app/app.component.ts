import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/service/auth.service';
import { AppService } from './shared/service/app.service';
import { Account } from './shared/interfaces/account';
import { TradeService } from './shared/service/trade.service';
import { Subscription } from 'rxjs';
import { SelectedUserAccountService } from './shared/service/selected-account-service';

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
  userId: any = null;
  accounts: Account[] = [];
  selectedAccount: Account | null = new Account();

  private selectedAccountSubscription: Subscription | undefined;
  private userDetailsSubscription: Subscription | undefined;
  private userAccountsSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private appService: AppService, private userAccountService: SelectedUserAccountService, private tradeService: TradeService) { }

  ngOnInit(): void {
    this.isUserAuthentic();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.selectedAccountSubscription?.unsubscribe();
    this.userDetailsSubscription?.unsubscribe();
    this.userAccountsSubscription?.unsubscribe();
  }

  isUserAuthentic() {
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      if (this.isAuthenticated) {
        this.setUserDetails();
      } else {
        this.tradeService.cleanTradesData();
      }
    });
  }

  setUserDetails() {
    this.userDetailsSubscription = this.userAccountService.getSelectedUser().subscribe({
      next: response => {
        if (response) {
          this.userId = response?.userId;
          this.setUserAccounts();
        } else {
          console.log(response, "Didn't get User");
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }

  setUserAccounts() {
    this.userAccountsSubscription = this.appService.getAccountName(this.userId).subscribe({
      next: response => {
        if (response.Account) {
          this.accounts = response.Account.map((element: any) => this.createAccountObject(element));
          this.userAccountService.setSelectedUserAccounts(this.accounts);
          this.setAccount();
        }
      },
      error: err => {
        console.log("error", err)
      }
    });
  }

  setAccount() {
    this.selectedAccountSubscription = this.userAccountService.getSelectedAccount().subscribe(response => {
      this.selectedAccount = response;
      if (this.selectedAccount) {
        this.initializeAlltradeData();
      }
    });
  }

  initializeAlltradeData() {
    this.tradeService.initializeTradesData(this.selectedAccount!);
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
