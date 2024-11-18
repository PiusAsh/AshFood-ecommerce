import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { FAQComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { MenuPageComponent } from './menu-page/menu-page.component';
import { SearchResultPageComponent } from './search-result-page/search-result-page.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  // { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  {
    path: 'search/:searchTerm',
    component: SearchResultPageComponent,
  },
  { path: 'about-us', component: AboutComponent },
  { path: 'contact-us', component: ContactPageComponent },
  { path: 'our-menu', component: MenuPageComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'faq', component: FAQComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
