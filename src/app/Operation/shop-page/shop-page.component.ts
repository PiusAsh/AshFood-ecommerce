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
