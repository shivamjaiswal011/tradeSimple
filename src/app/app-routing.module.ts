import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionSizingComponent } from './position-sizing/position-sizing.component';
import { HomeComponent } from './home/home.component';
import { TradelogComponent } from './tradelog/tradelog.component';
import { JournalComponent } from './journal/journal.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'positionSizing', component: PositionSizingComponent },
  { path: 'tradelog', component: TradelogComponent },
  { path: 'journal', component: JournalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
