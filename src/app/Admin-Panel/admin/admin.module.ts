import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRoomsComponent } from '../manage-rooms/manage-rooms.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { ManageBookingsComponent } from '../manage-bookings/manage-bookings.component';
import { RoomCategoryComponent } from '../room-category/room-category.component';
import { ManageReviewsComponent } from '../manage-reviews/manage-reviews.component';
import { RoleSetupComponent } from '../role-setup/role-setup.component';
import { ReportComponent } from '../report/report.component';
import { ProfileComponent } from '../profile/profile.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminSpinnerComponent } from '../admin-spinner/admin-spinner.component';
import { NgToastModule } from 'ng-angular-popup';
import { AdminTruncatePipe, TruncatePipe } from 'src/app/Shared/Pipes/truncate.pipe';



@NgModule({
  declarations: [
    ManageRoomsComponent,
    ManageUsersComponent,
    ManageBookingsComponent,
    RoomCategoryComponent,
    ManageReviewsComponent,
    RoleSetupComponent,
    ReportComponent,
    ProfileComponent,
    DashboardComponent,
    AdminSpinnerComponent,
    AdminTruncatePipe
    
  ],
  imports: [
        CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    NgxPaginationModule, // Add this line
    NgbModule,
    NgToastModule,
    NgSelectModule,
    HttpClientModule,

  ]
})
export class AdminModule { }
