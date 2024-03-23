import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionSizingComponent } from './position-sizing/position-sizing.component';
import { TradelogComponent } from './tradelog/tradelog.component';
import { JournalComponent } from './journal/journal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationComponent } from './authentication/authentication.component';
import { IndividualTradeComponent } from './individual-trade/individual-trade.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'positionSizing', component: PositionSizingComponent, canActivate: [AuthGuard] },
  { path: 'tradelog', component: TradelogComponent, canActivate: [AuthGuard] },
  { path: 'journal', component: JournalComponent, canActivate: [AuthGuard] },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'individualTrade', component: IndividualTradeComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
