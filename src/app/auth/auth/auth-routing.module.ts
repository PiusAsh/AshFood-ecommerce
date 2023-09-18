import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../Pages/login/login.component';
import { RegisterComponent } from '../Pages/register/register.component';




const authRoutes: Routes = [
   
  {
    path: 'login',
    component: LoginComponent, data: { breadcrumb: 'Login' },
  },
  {
    path: 'register',
    component: RegisterComponent, data: { breadcrumb: 'Register' },
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
