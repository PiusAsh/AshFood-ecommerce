import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageReviewsComponent } from '../manage-reviews/manage-reviews.component';
import { ManageRoomsComponent } from '../manage-rooms/manage-rooms.component';
import { RoomCategoryComponent } from '../room-category/room-category.component';
import { ManageBookingsComponent } from '../manage-bookings/manage-bookings.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { RoleSetupComponent } from '../role-setup/role-setup.component';
import { ProfileComponent } from '../profile/profile.component';
import { ReportComponent } from '../report/report.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AuthGuard } from 'src/app/auth/Guard/auth-guard.guard';



const adminRoutes: Routes = [
   
  {
    path: 'dashboard',
    component: DashboardComponent, data: { breadcrumb: 'Dashboard', canActivate: [AuthGuard] },
  },
  {
    path: 'manage-reviews',
    component: ManageReviewsComponent, data: { breadcrumb: 'Manage Reviews', canActivate: [AuthGuard]}
  },
  {
    path: 'manage-rooms',
    component: ManageRoomsComponent, data: { breadcrumb: 'Manage Rooms', canActivate: [AuthGuard]}
  },
  {
    path: 'manage-categories',
    component: RoomCategoryComponent, data: { breadcrumb: 'Manage Categories', canActivate: [AuthGuard]}
  },
  {
    path: 'manage-bookings',
    component: ManageBookingsComponent, data: { breadcrumb: 'Manage Bookings', canActivate: [AuthGuard]}
  },
  {
    path: 'manage-users',
    component: ManageUsersComponent, data: { breadcrumb: 'Manage Users', canActivate: [AuthGuard]}
  },
  {
    path: 'role-setup',
    component: RoleSetupComponent, data: { breadcrumb: 'Role & Menu Setup', canActivate: [AuthGuard]}
  },
  {
    path: 'profile',
    component: ProfileComponent, data: { breadcrumb: 'Profile', canActivate: [AuthGuard]}
  },
  {
    path: 'report',
    component: ReportComponent, data: { breadcrumb: 'Report', canActivate: [AuthGuard]}
  },

];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
