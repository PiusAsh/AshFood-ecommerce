import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/Models/food';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';
import { ProductService } from 'src/app/Services/product.service';
import { ReviewsService } from 'src/app/Services/reviews.service';

@Component({
  selector: 'app-view-food',
  templateUrl: './view-food.component.html',
  styleUrls: ['./view-food.component.css']
})
export class ViewFoodComponent implements OnInit {
  food: any;
  cart: any;
  reviews: any;
  AllAddedItems: any;
  loading: boolean = false;

  reviewForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute,
    private operationService: OperationService, private productService: ProductService,
    private route: Router, private cartService: CartService, private reviewService: ReviewsService, private fb: FormBuilder){

      this.cartService.getCartObservable().subscribe((cart) => {
        this.cart = cart;
this.AllAddedItems = cart.items;
        console.log(this.AllAddedItems, "AllAddedItems");
        
      });
    
      this.reviewForm = this.fb.group({
        foodId: [''],
        commentedById: [''],
        commentedByName: [''],
        rating: [null],
        comment: ['', Validators.required],
        postedDate: [''],
      })
  
  }


  ifAddedToCart(product: any): boolean {
    // Check if the product is in the list of added items (cart)
    const cartItem = this.AllAddedItems.find((item) => item.food.id === product.id);
    
    // Return true if the product is in the cart, otherwise, return false
    return !!cartItem;
  }
  onSubmit: boolean = false;
  ngOnInit(): void {
    this.loading = true;
    this.reviewForm.value.commentedByName = "Pius Ash";

    this.activatedRoute.params.subscribe((params) => {
      const foodID = params['id'];
      if (foodID) {
        this.productService.getProductId(foodID).subscribe(
          (product: any) => {
            this.food = product.data;
            this.loading = false;
            console.log(this.food, "food");
          },
          (error) => {
            console.error('Error fetching product:', error);
            // Handle the error here, e.g., display an error message to the user
          }
        );
    
        this.reviewService.getReviewsByFoodId(foodID).subscribe(
          (data: any) => {
            if (data.data.length) {
              this.reviews = data.data;
              console.log(this.reviews, "Review");
            }
          },
          (error) => {
            this.loading = false;
            console.error('Error fetching reviews:', error);
            // Handle the error here, e.g., display an error message to the user
          }
        );
      }
    });
    
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

  AddReview(){
    this.reviewForm.value.postedDate = new Date;
    this.reviewForm.value.commentedById = 1;
    this.reviewForm.value.commentedByName = "Pius Ash";
    this.reviewForm.value.rating = 2;
    this.reviewForm.value.foodId = parseInt(this.food.id);
    this.onSubmit = true;
    this.reviewService.AddReview(this.reviewForm.value).subscribe((data: any) =>{
      if(data.statusCode == 200){
        this.onSubmit = false;
        this.reviewForm.reset();
        this.ngOnInit();
      }
    });
  }
}
