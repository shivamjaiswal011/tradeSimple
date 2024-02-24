import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { PositionSizingComponent } from './position-sizing/position-sizing.component';
import { HomeComponent } from './home/home.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { UploadFileComponent } from './shared/component/upload-file/upload-file.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalanderComponent } from './dashboard/calander/calander.component';
import { TradelogComponent } from './tradelog/tradelog.component';
import { AgGridModule } from 'ag-grid-angular';
import { JournalComponent } from './journal/journal.component';
import { OrderCardComponent } from './shared/component/order-card/order-card.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndividualTradeComponent } from './individual-trade/individual-trade.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PositionSizingComponent,
    HomeComponent,
    UploadFileComponent,
    CalanderComponent,
    TradelogComponent,
    JournalComponent,
    OrderCardComponent,
    DashboardComponent,
    IndividualTradeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    FormsModule,
    MatListModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule,
    MatCardModule,
    FullCalendarModule,
    AgGridModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
