import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from 'src/app/app-routing.module';





@NgModule({
  declarations: [
   
    MainLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [
    MainLayoutComponent
  ]
})


export class LayoutModule { }
