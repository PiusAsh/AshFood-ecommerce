import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './Pages/home/home.component';
import { AboutComponent } from './Pages/about/about.component';
import { FAQComponent } from './Pages/faq/faq.component';
import { ServiceComponent } from './Pages/service/service.component';
import { ApiErrorInterceptor } from './Interceptors/api-error.interceptor';
import { HeaderComponent } from './Shared/Layout/header/header.component';
import { SidebarComponent } from './Shared/Layout/sidebar/sidebar.component';
import { FooterComponent } from './Shared/Components/footer/footer.component';
import { LayoutModule } from './Shared/Layout/layout.module';
import { NavbarComponent } from './Shared/Components/navbar/navbar.component';
import { AdminRoutingModule } from './Admin-Panel/admin/admin-routing.module';

import { BookingComponent } from './Operation/booking/booking.component';
import { PageNotFoundComponent } from './Shared/Components/page-not-found/page-not-found.component';
import { InternetOfflineComponent } from './Shared/Components/internet-offline/internet-offline.component';
import { SharedModule } from './Shared/shared.module';
import { AdminModule } from './Admin-Panel/admin/admin.module';
import { AdminSpinnerComponent } from './Admin-Panel/admin-spinner/admin-spinner.component';
import { NgToastModule } from 'ng-angular-popup';
import { ErrorHandlingInterceptor } from './Interceptors/error-handling.interceptor';
import { DraggableModalDirective } from './Shared/Directives/draggable-modal.directive';
import { ProductDescriptionPipe, TruncatePipe } from './Shared/Pipes/truncate.pipe';
import { SpinnerComponent } from './Shared/Components/spinner/spinner.component';

import { AuthModule } from './auth/auth/auth.module';
import { CheckoutComponent } from './Operation/checkout/checkout.component';
import { CartPageComponent } from './Operation/cart-page/cart-page.component';
import { FoodListComponent } from './Operation/food-list/food-list.component';
import { ViewFoodComponent } from './Operation/view-food/view-food.component';
import { NotFoundComponent } from './Shared/Components/not-found/not-found.component';
import { ShopPageComponent } from './Operation/shop-page/shop-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContactPageComponent } from './Pages/contact-page/contact-page.component';
import { MenuPageComponent } from './Pages/menu-page/menu-page.component';
import { SearchResultPageComponent } from './Pages/search-result-page/search-result-page.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    FAQComponent,
    ServiceComponent,
    FooterComponent,
    NavbarComponent,
    BookingComponent,
    PageNotFoundComponent,
    InternetOfflineComponent,
    DraggableModalDirective,
    TruncatePipe,
    SpinnerComponent,
    NotFoundComponent,
    
    CheckoutComponent,
    CartPageComponent,
    FoodListComponent,
    ViewFoodComponent,
    ShopPageComponent,
    ContactPageComponent,
    MenuPageComponent,
    SearchResultPageComponent,
    ProductDescriptionPipe
    //  AdminSpinnerComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    SharedModule,
    AdminModule,
    NgxPaginationModule, // Add this line
    NgbModule,
    NgToastModule,
    NgSelectModule,
    AuthModule,
    NgbTypeaheadModule,
    
   

    
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorHandlingInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiErrorInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
