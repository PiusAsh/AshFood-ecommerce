import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/cartItem';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  cartItem!: CartItem;

  constructor(
    private cartService: CartService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private toast: NgToastService
  ){

  }

 
 
//   changeQuantity(delta: number, cartItem: CartItem, quantity: number): void {
// console.log(quantity, "quantity")
//     // this.quantity = cartItem.quantity;
//     this.quantity += delta;
//     if (this.quantity < 1) {
//       this.quantity = 1;
//     }
//       quantity = this.quantity;
//     // Call the service method to update the cart
//     this.cartService.changeQuantity(cartItem.food.id, quantity);
//   }
  

// changeQuantity(delta: number, cartItem: CartItem): void {
//   cartItem.quantity += delta;
//   if (cartItem.quantity < 1) {
//     cartItem.quantity = 1;
//   }
//   this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity);
// }
quantity: number = 1;
changeQuantity(delta: number, cartItem: CartItem) {
  
  cartItem.quantity += delta;
  if (cartItem.quantity < 1) {
    cartItem.quantity = 1;
  }
  this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity);
}
  changeQuantity1(cartItem: CartItem, quantityInString: string){
const quantity = parseInt(quantityInString)
this.cartService.changeQuantity(cartItem.food.id, quantity)
  }
minusQuantity: any;
plusQuantity: any;
// changeQuantity(cartItem: CartItem) {
//     const minus = this.minusQuantity;

//     const plus = this.plusQuantity;

//     let difference = plus - minus;
//     cartItem.quantity = difference;

//     this.cartService.changeQuantity(cartItem.food.id, difference);
//     this.toast.success({
//       detail: 'Duration Update',
//       summary: 'Count changed',
//       duration: 3000,
//     });
//   }
  
  ngOnInit(): void {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
    });
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.toast.success({
      detail: 'Cart Update!',
      summary: 'Product has been removed successfully',
      duration: 3000,
    });
  }

  

  checkoutRoute(){
    this.route.navigate(['/shop/checkout']);
    window.scrollTo(0, 0);
      }
  shoRoute(){
    this.route.navigate(['/home/our-menu']);
    window.scrollTo(0, 0);
      }
}
