import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  NgbModule,
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiErrorInterceptor } from './Interceptors/api-error.interceptor';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { LayoutModule } from './Shared/Layout/layout.module';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';
import { PageNotFoundComponent } from './Shared/Components/page-not-found/page-not-found.component';
import { InternetOfflineComponent } from './Shared/Components/internet-offline/internet-offline.component';
import { SharedModule } from './Shared/shared.module';
import { NgToastModule } from 'ng-angular-popup';
import {
  ProductDescriptionPipe,
  TruncatePipe,
} from './Shared/Pipes/truncate.pipe';
import { SpinnerComponent } from './Shared/Components/spinner/spinner.component';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { BasicPagesBreadcrumbComponent } from './Shared/Components/basic-pages-breadcrumb/basic-pages-breadcrumb.component';
import { CurrencyFormatDirective } from './Shared/Helpers/currency-format.directive';
import { DateAgoPipe } from './Shared/Pipes/dateAgo.pipe';
import { HomeNavbarComponent } from './Shared/Components/home-navbar/home-navbar.component';

@NgModule({
  declarations: [
    AppComponent,

    //  AdminSpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorHandlingInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
