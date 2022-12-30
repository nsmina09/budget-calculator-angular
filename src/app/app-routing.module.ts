import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BudgetComponent } from './budget/budget.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
  path: 'register',
  component: RegisterComponent
},
{
  path:'login',
  component:LoginComponent
},
{
  path:'budget',
  component:BudgetComponent
},
{
  path:'',
  component:HomeComponent
}
];


@NgModule({
  declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule] 
})
export class AppRoutingModule { }
