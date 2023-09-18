import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../Models/cart';
import { NgToastService } from 'ng-angular-popup';
import { Food } from '../Models/food';
import { CartItem } from '../Models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor(private toast: NgToastService) { }

  addToCart(food: Food): void {
    let cartItem = this.cart.items.find((item) => item.food.id === food.id);
    if (cartItem) return;
this.toast.error({
  detail: 'Unable to Add to Cart',
  summary: 'An Error Occurred',
  duration: 4000,
});
    this.cart.items.push(new CartItem(food));
    this.setCartToLocalStorage();
    this.toast.success({detail: "Added to Cart", summary: "Room added successfully", duration: 4000})
  }
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

 
  getCart(): Cart {
    return this.cartSubject.value;
  }

  
  private setCartToLocalStorage(): void {
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) =>
        parseFloat(prevSum.toString()) + parseFloat(currentItem.price.toString()),
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }
  removeFromCart(foodId: number): void {
    this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
    this.setCartToLocalStorage();
  }


  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => item.food.id === parseInt(foodId));
    if (!cartItem) return;
    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }


  
//   changeQuantity3(foodId: string, quantity: number) {
//     let cartItem = this.cart.items.find((item) => item.food.id === foodId);
//     if (!cartItem) return;
//     cartItem.quantity = quantity;
//     cartItem.price = quantity * cartItem.food.price;
//     this.setCartToLocalStorage();
// }


  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
