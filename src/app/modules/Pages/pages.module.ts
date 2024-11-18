import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { FAQComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { ServiceComponent } from './service/service.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { SharedModule } from 'src/app/Shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    FAQComponent,
    ServiceComponent,
    ContactPageComponent,
    MenuPageComponent,
    SearchResultPageComponent,
  ],
  imports: [CommonModule, PagesRoutingModule, SharedModule],
})
export class PagesModule {}
