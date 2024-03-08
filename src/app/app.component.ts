import { SelectedAccountService } from './shared/service/selected-account-service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from './shared/service/auth.service';
import { AppService } from './shared/service/app.service';
import { Account } from './shared/interfaces/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isSidenavOpen: boolean = true;
  title: string = 'Trade Simple';
  isAuthenticated: boolean = false;
  userId: string | null = null;
  accounts: Account[] = [];

  constructor(private authService: AuthService, private appService: AppService, private selectedAccountService: SelectedAccountService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    this.appService.getAccountName(this.userId).subscribe({
      next: response => {
        if (response.Account) {
          this.accounts = [];
          response.Account.forEach((element: any) => {
            let account: Account = new Account();
            account.accountID = element.account_id;
            account.accountName = element.account_name;
            account.userID = element.user_id;
            account.lastImportFromDate = element.last_import_from_date;
            account.lastImportToDate = element.last_import_to_date;
            this.accounts.push(account);
          });
          this.selectedAccountService.setSelectedAccountDetails(this.accounts);
        }
      },
      error: err => {
        console.log("error", err)
      }
    });
  }

  updateTitle(newTitle: string) {
    this.title = newTitle;
  }

}
