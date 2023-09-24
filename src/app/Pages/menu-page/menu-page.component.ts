import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';
import { applyGlobalSearch } from 'src/app/Shared/Helpers/global-table-search';


@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})

export class MenuPageComponent implements OnInit {
  AllAddedItems: any;
  cart: any;
  listCurrentPage = 1;
  listPageSize = 12; // Number of items per page
  gridCurrentPage = 1;
  gridPageSize = 12; // Number of items per page
  totalItems: number; // Total number of items in your collection
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
  defaultProducts: any
  ngOnInit(): void {
    this.products = this.operationService.getAllProducts();
    this.defaultProducts = this.operationService.getAllProducts();
    console.log(this.products, "products")
    this.totalItems = this.products.length;
// this.loadMore();
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


  activeTab: string = 'grid';
  currentTab: string = 'list'; // Default active tab

  // Function to switch to a specific tab
  switchTab(tabName: string) {
    this.activeTab = tabName;
    
  }

  viewFood(route: number){
    this.route.navigate(['view-food/',`${route}`]);
    window.scrollTo(0, 0);
      }



      searchText: string = "";
      applyFilter() {
        this.products = applyGlobalSearch(
          this.defaultProducts,
          this.searchText,
          ['name', 'price', 'category',]
        )
       
      }
      
    
    resetSearch(){
      this.searchText = '';
      this.ngOnInit();
    }

scrollTop(){
  window.scrollTo(0, 0);
}

// Calculate the range of items being displayed
getListDisplayedItemsRange() {
  const start = (this.listCurrentPage - 1) * this.listPageSize + 1;
  const end = Math.min(this.listCurrentPage * this.listPageSize, this.products.length);
  return `${start} - ${end}`;
}
// Calculate the range of items being displayed
geGridDisplayedItemsRange() {
  const start = (this.gridCurrentPage - 1) * this.gridPageSize + 1;
  const end = Math.min(this.gridCurrentPage * this.gridPageSize, this.products.length);
  return `${start} - ${end}`;
}
   
}