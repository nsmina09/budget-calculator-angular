import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BudgetComponent } from './budget/budget.component';
import { HomeComponent } from './home/home.component';
import { RemarksComponent } from './remarks/remarks.component';
import { LastmonthComponent } from './lastmonth/lastmonth.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'budget', component: BudgetComponent },
  { path: 'lastmonth/:month/:username', component: LastmonthComponent },
  { path: 'remarks', component: RemarksComponent },
  { path: "**", component: PagenotfoundComponent },
  
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  RemarksComponent,
  LastmonthComponent,
  HomeComponent,
  BudgetComponent,
  LoginComponent,
  RegisterComponent,
  PagenotfoundComponent
]
