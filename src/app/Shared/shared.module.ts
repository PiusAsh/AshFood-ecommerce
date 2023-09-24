import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BasicPagesBreadcrumbComponent } from './Components/basic-pages-breadcrumb/basic-pages-breadcrumb.component';



@NgModule({
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
  ],
  declarations: [
    

  
   
  ]
})
export class SharedModule { }
