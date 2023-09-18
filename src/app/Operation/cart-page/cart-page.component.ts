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

  quantity: number = 1;

  // changeQuantity(delta: number, cartItem: CartItem, quantity: number): void {
  //   this.quantity += delta;
  //   if (this.quantity < 1) {
  //     this.quantity = 1;
  //   }
  
  //   // Call the service method to update the cart
  //   this.cartService.changeQuantity(cartItem.food.id, this.quantity);
  // }
  


//   changeQuantity2(cartItem: CartItem, quantityInString: string){
// const quantity = parseInt(quantityInString)
// this.cartService.changeQuantity(cartItem.food.id, quantity)
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

  
}
