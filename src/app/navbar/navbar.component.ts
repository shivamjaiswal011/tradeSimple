import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() title: string = '';
  isSidenavOpen: boolean = true;
  selectedAccounts: any;
  accountList: any = [];
  accountForm = new FormControl('');
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    //subscribe to apiService.getAccount()
    this.accountList.push({ id: 1, name: 'shivam' });
    this.accountList.push({ id: 2, name: 'Priyanka' });
    this.accountList.push({ id: 3, name: 'Shubham' });
  }

  functionAccountChange(event: any) {
    console.log(event);
    console.log(this.startDate);
    console.log(this.endDate);
  }

  onDateChange(event: any) {
    console.log(event);
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
  }


}
