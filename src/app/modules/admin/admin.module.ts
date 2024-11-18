import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, SharedModule],
})
export class AdminModule {}
