import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgToastModule } from 'ng-angular-popup';
import { NgSelectModule } from '@ng-select/ng-select';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from '../Pages/register/register.component';
import { LoginComponent } from '../Pages/login/login.component';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule, // Add this line
    NgbModule,
    NgToastModule,
    NgSelectModule,
    HttpClientModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
