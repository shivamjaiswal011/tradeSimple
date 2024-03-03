import { Component, OnInit } from '@angular/core';
import { AppService } from '../../service/app.service';
import { AuthService } from '../../service/auth.service';
import { SelectedAccountService } from '../../service/selected-account-service';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {
  selectedFile: File | null = null;
  userId: string | null = null;
  accountId: string = '';
  constructor(private appService: AppService, private authService: AuthService, private selectedAccountService: SelectedAccountService) { }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    this.selectedAccountService.getSelectedAccount().subscribe({
      next: response => {
        if (response != null)
          this.accountId = response;
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
    if (this.userId && this.accountId) {
      const formData = new FormData();
      formData.append('csv', this.selectedFile);
      formData.append('user_id', this.userId);
      formData.append('account_id', this.accountId);

      this.appService.uploadCsv(formData).subscribe({
        next: response => {
          console.log('File uploaded successfully:', response);
          // Handle response from backend as needed
        },
        error: error => {
          console.error('Error uploading file:', error);
          // Handle error
        }
      });
    } else {
      console.error('User ID or Account ID is null.');
    }
  }
}