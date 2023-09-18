import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/Services/admin.service';
import { BookingService } from 'src/app/Services/booking.service';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: any;
  selectedMenu: any;
  selectedCategory: any;
  categorie1s: any;
  menus: any[] = [];
  // selectedCategory: string | null = null;
  categories: string[] = [];
  products: any;
  
  private modalRef: NgbModalRef | undefined;
    constructor( private activatedRoute: ActivatedRoute,   private cartService: CartService, private modalService: NgbModal, private operationService: OperationService, private route: Router) { }
  foodResult: any;
  food: any;
  
    ngOnInit() {
  
      this.products = this.operationService.getAllProducts();
      this.loadCategories();
      this.selectedCategory = this.categories[0];
  
      this.activatedRoute.params.subscribe((params) =>{
        if(params['searchTerm']){
  this.foods = this.operationService.getAllFoodsBySearch(params['searchTerm']);
  console.log(this.foods, 'this.foods')
  this.foodResult = this.foods.length > 0;
        }else{
          this.operationService.getAllProducts()
        }
      })
    }
    viewCartModal(viewCartParam: any) {
      this.modalRef = this.modalService.open(viewCartParam, { backdrop: 'static' });
    }
  
  
  
    loadCategories(): void {
      this.categories = Array.from(new Set(this.products.map(product => product.category)));
    }
  
    getProductsByCategory(category: string): any[] {
      return this.products.filter(product => product.category === category);
    }
  
    selectCategory(category: string): void {
      this.selectedCategory = category;
    }
  
  
    getProductsByCategory3(menu: any) {
      this.selectedMenu = menu;
    }


    
  // addToCart() {
  //   if(this.isAuth){

  //     this.cartService.addToCart(this.room);
  //     this.route.navigateByUrl('/cart-page');
  //   }else{
  //     this.toast.error({detail: "You're not logged in..", summary: "Please login to proceed", duration: 4000})
  //     this.route.navigateByUrl('/login');
  //   }
  // }


  addToCart(product){
     this.cartService.addToCart(product);
      this.route.navigateByUrl('/cart');
  }
  // get isAuth() {
  //   return this.resp;
  // }


  
  viewFood(route: number){
    this.route.navigate(['view-food/',`${route}`]);
    window.scrollTo(0, 0);
      }
}
