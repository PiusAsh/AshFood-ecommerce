import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/cartItem';
import { PayStackService } from 'src/app/Paystack Service/paystack.service';
import { CartService } from 'src/app/Services/cart.service';
// declare function payWithPaystack(): any;
declare var PaystackPop: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent {
  shippingMode: string = 'default';
  cart!: Cart;
  cartItem!: CartItem;
  constructor(
    private cartService: CartService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private toast: NgToastService, private payStackService: PayStackService,
  ){

  }



  ngOnInit(): void {
    this.getPaymentDetailsByReference('49819316483');

    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart.totalPrice,'cart.totalPrice');
    });
  }
  viewFood(route: number){
    this.route.navigate(['view-food/',`${route}`]);
    window.scrollTo(0, 0);
      }
  shopRoute(){
    this.route.navigate(['our-menu']);
    window.scrollTo(0, 0);
      }

      initiatePayment() {
        console.log('initiating payment');
        this.payStackService.initializePayment(this.cart.totalPrice, 'pius1ash@gmail.com', '565675TYTYERY')
          .subscribe(response => {
            // Handle the response from Paystack (e.g., redirect to payment page)
            console.log(response);
          });
      }

      // PAYSTACK INTEGRATION
      email: string = 'pius1ash@gmail.com';
      // amount = this.cart.totalPrice;
    
      payWithPaystack(e) {
        e.preventDefault();
    
        let handler = PaystackPop.setup({
          key: 'pk_test_db114057f7e1e073f3bc5d5551869e8eef51b9b1', // Replace with your public key
          email: this.email,
          amount: this.cart.totalPrice * 100,
          ref: ''+Math.floor((Math.random() * 1000000000) + 1),
          onClose: function(){
            alert('Window closed.');
            console.log('window closed', handler);
          },
          callback: function(response){
            let message = 'Payment complete! Reference: ' + response.reference;
            alert(message);
            console.log('window response', response);
    
          }
        });
    
        handler.openIframe();
      }
      
      //END OF PAYSTACK INTEGRATION

      getPaymentDetailsByReference(reference: string) {
        this.payStackService.getPaymentDetailsByReference(reference)
          .subscribe(response => {
            // Handle the response here
            console.log('Payment Details:', response);
          }, error => {
            // Handle error
            console.error(error);
          });
      }
}
