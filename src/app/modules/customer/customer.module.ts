import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [],
  imports: [CommonModule, CustomerRoutingModule, SharedModule],
})
export class CustomerModule {}
