import { Component, OnInit, ViewChild } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/cartItem';
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
  @ViewChild('content') content: NgbOffcanvas;
  cartQuantity: number = 1;
  products: any;
  cart!: Cart;
  AllAddedItems: any;
  searchTerm = "";
  
  search(term: string){
    if(term){
this.route.navigateByUrl('/search/'+ term)
    }
  }
 
  private modalRef: NgbModalRef | undefined;
  // ifAddedToCart: boolean = false;
  NotInCart: boolean = false;
    constructor( private activatedRoute: ActivatedRoute, private offcanvasService: NgbOffcanvas, private toast: NgToastService,  private cartService: CartService, private modalService: NgbModal, private operationService: OperationService, private route: Router) {


      this.cartService.getCartObservable().subscribe((cart) => {
        this.cart = cart;
this.AllAddedItems = cart.items;
        console.log(this.AllAddedItems, "AllAddedItems");
        
      });



     }
  foodResult: any;
  food: any;
  onSubmit: boolean = false;
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.toast.success({
      detail: 'Cart Update!',
      summary: 'Product has been removed successfully',
      duration: 3000,
    });
  }





    ngOnInit() {
  
      this.products = this.operationService.getAllProducts();
      this.loadCategories();
      this.selectedCategory = this.categories[0];
      // this.loadMore()
  
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
    productsToDisplay: any; 
    getProductsByCategory(category: string): any[] {
      this.productsToDisplay = this.products.filter(product => product.category === category)
      return this.products.filter(product => product.category === category);
    }
  
    selectCategory(category: string): void {
      this.selectedCategory = category;
    }
  
  
    getProductsByCategory3(menu: any) {
      this.selectedMenu = menu;
    }

    ifAddedToCart(product: any): boolean {
      // Check if the product is in the list of added items (cart)
      const cartItem = this.AllAddedItems.find((item) => item.food.id === product.id);
      
      // Return true if the product is in the cart, otherwise, return false
      return !!cartItem;
    }
    
    displayedProducts: any[] = [];
    itemsToShow = 6;
    loadMoreButtonText = 'Load More';
    isLoadMoreDisabled: Boolean = false;
    loadMore() {
      const startIndex = this.displayedProducts.length;
      const endIndex = startIndex + this.itemsToShow;
      const remainingItems = this.productsToDisplay.slice(startIndex, endIndex);
    
      if (remainingItems.length === 0) {
        this.loadMoreButtonText = 'Reached Maximum';
        this.isLoadMoreDisabled = true;
      }
    
      this.displayedProducts.push(...remainingItems);
    }
    
  
    loadLess() {
      const minItemsToShow = Math.min(this.itemsToShow, this.displayedProducts.length);
  
      if (this.displayedProducts.length > minItemsToShow) {
        this.loadMoreButtonText = 'Load More'
        this.displayedProducts = this.displayedProducts.slice(0, -this.itemsToShow);
      }
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
  buttonText = "Add To Cart";
  isLoading = false;
  
productCart: any;
  addToCart(product){
    this.onSubmit = true;
     this.cartService.addToCart(product);
  }

  scrollTop(){
    window.scrollTo(0, 0);
  }
  listCurrentPage = 1;
  listPageSize = 12; // Number of items per page

  
  viewFood(route: number){
    this.route.navigate(['view-food/',`${route}`]);
    window.scrollTo(0, 0);
      }



      
  closeCartOffCanvas() {
    if (this.content) {
        this.content.dismiss();
    }
}

  openCartOffCanvas(content) {
		this.offcanvasService.open(content, { position: 'end' });
	}
 

  checkoutRoute(){
    this.route.navigate(['checkout']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
      }
  cartRoute(){
    this.route.navigate(['cart']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
      }
  shopRoute(){
    this.route.navigate(['cart']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
      }


 

      menusCat = [
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 1',
          items: [
            { name: 'Item 1', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 2', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 2',
          items: [
            { name: 'Item 3', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 4', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 3',
          items: [
            { name: 'Item 5', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 6', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 4',
          items: [
            { name: 'Item 7', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 8', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        },
        {
          name: 'Menu 5',
          items: [
            { name: 'Item 9', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            { name: 'Item 10', image: 'https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png' },
            // Add more items as needed
          ]
        }
        // Add more menus as needed
      ];
 

 
}
