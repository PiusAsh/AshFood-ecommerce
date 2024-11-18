import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';
import { ProductService } from 'src/app/Services/product.service';
import { applyGlobalSearch } from 'src/app/Shared/Helpers/global-table-search';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css'],
})
export class MenuPageComponent implements OnInit {
  AllAddedItems: any;
  cart: any;
  listCurrentPage = 1;
  listPageSize = 12; // Number of items per page
  gridCurrentPage = 1;
  gridPageSize = 12; // Number of items per page
  totalItems: number; // Total number of items in your collection
  constructor(
    private operationService: OperationService,
    private cartService: CartService,
    private route: Router,
    private productService: ProductService
  ) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      this.AllAddedItems = cart.items;
    });
  }

  ifAddedToCart(product: any): boolean {
    // Check if the product is in the list of added items (cart)
    const cartItem = this.AllAddedItems.find(
      (item) => item.food.id === product.id
    );

    // Return true if the product is in the cart, otherwise, return false
    return !!cartItem;
  }
  cartRoute() {
    this.route.navigate(['/shop/cart']);
    window.scrollTo(0, 0);
  }
  categories: any[] = [];
  products: any;
  defaultProducts: any;
  page = 1  
  limit = 30
  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts() {
    this.productService.getProducts(this.page, this.limit).subscribe(
      (data: any) => {
        if (data.statusCode === 200) {
          if (data.data.length) {
            this.products = data.data;
            this.defaultProducts = data.data;
            this.totalItems = this.products.length;
          } else {
            Swal.fire({
              icon: 'info',
              title: '',
              text: data.responseMessage,
              confirmButtonText: 'OK',
            });
          }
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: '',
          text: error.error.responseMessage,
          confirmButtonText: 'OK',
        });
        console.error('Error fetching products:', error);
      }
    );
  }

  addToCart(product) {
    // this.onSubmit = true;
    this.cartService.addToCart(product);
  }
  // displayedProducts: any[] = [];
  // itemsToShow = 6;

  // loadMoreButtonText = 'Load More';
  // isLoadMoreDisabled: Boolean = false;
  // loadMore() {
  //   const startIndex = this.displayedProducts.length;
  //   const endIndex = startIndex + this.itemsToShow;
  //   const remainingItems = this.products.slice(startIndex, endIndex);

  //   if (remainingItems.length === 0) {
  //     this.loadMoreButtonText = 'Reached Maximum';
  //     this.isLoadMoreDisabled = true;
  //   }

  //   this.displayedProducts.push(...remainingItems);
  // }

  // loadLess() {
  //   const minItemsToShow = Math.min(this.itemsToShow, this.displayedProducts.length);

  //   if (this.displayedProducts.length > minItemsToShow) {
  //     this.loadMoreButtonText = 'Load More'
  //     this.displayedProducts = this.displayedProducts.slice(0, -this.itemsToShow);
  //   }
  // }

  activeTab: string = 'grid';
  currentTab: string = 'list'; // Default active tab

  // Function to switch to a specific tab
  switchTab(tabName: string) {
    this.activeTab = tabName;
  }

  viewFood(route: number) {
    this.route.navigate(['shop/view-product/', `${route}`]);
    window.scrollTo(0, 0);
  }

  searchText: string = '';
  applyFilter() {
    this.products = applyGlobalSearch(this.defaultProducts, this.searchText, [
      'name',
      'price',
      'category',
    ]);
  }

  resetSearch() {
    this.searchText = '';
    this.ngOnInit();
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }

  // Calculate the range of items being displayed
  getListDisplayedItemsRange() {
    const start = (this.listCurrentPage - 1) * this.listPageSize + 1;
    const end = Math.min(
      this.listCurrentPage * this.listPageSize,
      this.products.length
    );
    return `${start} - ${end}`;
  }
  // Calculate the range of items being displayed
  geGridDisplayedItemsRange() {
    const start = (this.gridCurrentPage - 1) * this.gridPageSize + 1;
    const end = Math.min(
      this.gridCurrentPage * this.gridPageSize,
      this.products.length
    );
    return `${start} - ${end}`;
  }
}
