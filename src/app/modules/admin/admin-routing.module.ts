import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: 'configuration',
    loadChildren: () =>
      import('./general-configuration/general-configuration.module').then(
        (m) => m.GeneralConfigurationModule
      ),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./product-management/product-management.module').then(
        (m) => m.ProductManagementModule
      ),
  },

  {
    path: 'categories',
    loadChildren: () =>
      import('./category-management/category-management.module').then(
        (m) => m.CategoryManagementModule
      ),
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./order-management/order-management.module').then(
        (m) => m.OrderManagementModule
      ),
  },
  {
    path: 'reviews',
    loadChildren: () =>
      import('./reviews-management/reviews-management.module').then(
        (m) => m.ReviewsManagementModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile-setting/profile-setting.module').then((m) => m.ProfileSettingModule),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customer-management/customer-management.module').then((m) => m.CustomerManagementModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
