import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {
  food: any;
  cart: any;
  AllAddedItems: any;
  constructor(private activatedRoute: ActivatedRoute,
    private operationService: OperationService,
    private route: Router, private cartService: CartService,){

      this.cartService.getCartObservable().subscribe((cart) => {
        this.cart = cart;
this.AllAddedItems = cart.items;
        console.log(this.AllAddedItems, "AllAddedItems");
        
      });
    
    activatedRoute.params.subscribe((params) => {
      const foodID = params['id'];
      if (foodID) {
          const foundFood = operationService.getFoodById(foodID);
          this.food = foundFood;
          console.log(foundFood, "food");
      }
  });
  
  }


  ifAddedToCart(product: any): boolean {
    // Check if the product is in the list of added items (cart)
    const cartItem = this.AllAddedItems.find((item) => item.food.id === product.id);
    
    // Return true if the product is in the cart, otherwise, return false
    return !!cartItem;
  }
  ngOnInit(): void {
  
  }
  activeTab: string = 'Description';
  currentTab: string = 'Reviews'; // Default active tab

  // Function to switch to a specific tab
  switchTab(tabName: string) {
    this.activeTab = tabName;
  }
 

  addToCart(product){
    this.cartService.addToCart(product);
     this.route.navigateByUrl('/cart');
 }
  quantity: number = 1;

  // changeQuantity(amount: number) {
  //   this.quantity += amount;

  //   if (this.quantity < 1) {
  //     this.quantity = 1;
  //   }
  // }
  cartRoute(){
    this.route.navigateByUrl('/cart');
  }
}
