import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {
  AllAddedItems: any;
  cart: any;
  constructor(private operationService: OperationService, private cartService: CartService, private route: Router){
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
this.AllAddedItems = cart.items;
      console.log(this.AllAddedItems, "AllAddedItems");
      
    });

  }

  ifAddedToCart(product: any): boolean {
    // Check if the product is in the list of added items (cart)
    const cartItem = this.AllAddedItems.find((item) => item.food.id === product.id);
    
    // Return true if the product is in the cart, otherwise, return false
    return !!cartItem;
  }
  cartRoute(){
    this.route.navigate(['cart']);
    window.scrollTo(0, 0);
    
      }
  categories: any[] = [];
  products: any
  ngOnInit(): void {
    this.products = this.operationService.getAllProducts();
    console.log(this.products, "products")
this.loadMore();
      this.loadCategories();
  }
  loadCategories(): void {
    this.categories = Array.from(new Set(this.products.map(product => product.category)));
    console.log(this.categories, "operationService")
  }

  addToCart(product){
    // this.onSubmit = true;
     this.cartService.addToCart(product);
  }
  displayedProducts: any[] = [];
  itemsToShow = 6;

  // loadMore() {
  //   const startIndex = this.displayedProducts.length;
  //   const endIndex = startIndex + this.itemsToShow;
  //   this.displayedProducts.push(...this.products.slice(startIndex, endIndex));
  // }
  loadMoreButtonText = 'Load More';
  isLoadMoreDisabled: Boolean = false;
  loadMore() {
    const startIndex = this.displayedProducts.length;
    const endIndex = startIndex + this.itemsToShow;
    const remainingItems = this.products.slice(startIndex, endIndex);
  
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


  currentTab: string = 'list';
  activeTab: string = 'grid'; // Default active tab

  // Function to switch to a specific tab
  switchTab(tabName: string) {
    this.activeTab = tabName;
  }

  viewFood(route: number){
    this.route.navigate(['view-food/',`${route}`]);
    window.scrollTo(0, 0);
      }




      
}
