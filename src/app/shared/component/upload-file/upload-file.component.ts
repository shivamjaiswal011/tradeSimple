import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { SelectedUserAccountService } from '../../service/selected-account-service';
import { Subscription } from 'rxjs';
import { Account } from '../../interfaces/account';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit, OnDestroy {
  selectedFile: File | null = null;
  selectedAccount: Account | null = new Account();
  private selectedAccountSubscription: Subscription | undefined;

  constructor(private appService: AppService, private userAccountService: SelectedUserAccountService) { }

  ngOnInit(): void {
    this.selectedAccountSubscription = this.userAccountService.getSelectedAccount().subscribe({
      next: response => {
        this.selectedAccount = response;
      },
      error: error => {
        console.log("Error fetching selected account:", error);
      }
    });
  }

  ngOnDestroy(): void {
    this.selectedAccountSubscription?.unsubscribe();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    // Ensure userId and accountId are not null
    if (this.selectedAccount?.accountID) {
      const formData = new FormData();
      formData.append('csv', this.selectedFile);
      formData.append('account_id', this.selectedAccount?.accountID);

      this.appService.uploadCsv(formData).subscribe({
        next: response => {
          console.log('File uploaded successfully:', response);
        },
        error: error => {
          console.error('Error uploading file:', error);
        }
      });
    } else {
      console.error('User ID or Account ID is null.');
    }
  }
}