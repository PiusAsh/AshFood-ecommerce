import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbPaginationModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BasicPagesBreadcrumbComponent } from './Components/basic-pages-breadcrumb/basic-pages-breadcrumb.component';
import { HomeNavbarComponent } from './Components/home-navbar/home-navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { InternetOfflineComponent } from './Components/internet-offline/internet-offline.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { SpinnerComponent } from './Components/spinner/spinner.component';
import { CurrencyFormatDirective } from './Helpers/currency-format.directive';
import { DateAgoPipe } from './Pipes/dateAgo.pipe';
import { TruncatePipe, ProductDescriptionPipe } from './Pipes/truncate.pipe';
import { NgToastModule } from 'ng-angular-popup';
import { StateHandlerComponent } from './Components/state-handler/state-handler.component';



@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    InternetOfflineComponent,
    TruncatePipe,
    DateAgoPipe,
    SpinnerComponent,
    NotFoundComponent,
    CurrencyFormatDirective,
    ProductDescriptionPipe,
    BasicPagesBreadcrumbComponent,
    HomeNavbarComponent,
    StateHandlerComponent,
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgToastModule,
    NgSelectModule,
    NgbTypeaheadModule,
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    InternetOfflineComponent,
    TruncatePipe,
    DateAgoPipe,
    SpinnerComponent,
    NotFoundComponent,
    CurrencyFormatDirective,
    ProductDescriptionPipe,
    BasicPagesBreadcrumbComponent,
    HomeNavbarComponent,
    // END OF COMPONENTS

    CommonModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgToastModule,
    NgSelectModule,
    NgbTypeaheadModule,
  ],
})
export class SharedModule {}
