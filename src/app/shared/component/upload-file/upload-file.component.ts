import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { SelectedUserAccountService } from '../../service/selected-account-service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFile: File | null = null;
  userID: any = null;
  accountID: string = '';
  lastImportFromDate: string = '';
  lastImportToDate: string = '';

  constructor(private appService: AppService, private authService: AuthService, private userAccountService: SelectedUserAccountService) { }

  ngOnInit(): void {
    this.userAccountService.getSelectedUser().subscribe({
      next: response => {
        this.userID = response?.userId;
      },
      error: error => {
        console.log(error);
      }
    });
    this.userAccountService.getSelectedAccount().subscribe({
      next: response => {
        if (response != null) {
          this.accountID = response.accountID;
          this.lastImportFromDate = response.lastImportFromDate
          this.lastImportToDate = response.lastImportToDate
        }
        else
          console.log("No Account is Selected");
      },
      error: error => {
        console.log("Error fetching selected account:", error);
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    // Ensure userId and accountId are not null
    if (this.userID && this.accountID) {
      const formData = new FormData();
      formData.append('csv', this.selectedFile);
      formData.append('user_id', this.userID);
      formData.append('account_id', this.accountID);

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