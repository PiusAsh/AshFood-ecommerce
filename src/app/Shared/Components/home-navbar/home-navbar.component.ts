import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/cartItem';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent {


  selectedMenu: any;
  menus: any[] = [];
  searchTerm = "";
  loginForm: FormGroup;
  cartQuantity: number = 1;
  @ViewChild('content') content: NgbOffcanvas;
  previousCartQuantity: number = 0;
  searchMenu: FormGroup;
  offcanvasRef: NgbOffcanvas;
  
  constructor(private operationService: OperationService ,
    private offcanvasService: NgbOffcanvas, private router: Router, private authService: AuthenticationService,  private toast: NgToastService, private adminService: AdminService, private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: FormBuilder, private cartService: CartService){

    
    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', Validators.required],
      password: ['', Validators.required]
    });
    
    this.searchMenu = this.formBuilder.group({
      menuName: ['Select Menu Category'],
    });

    // this.cartService.getCartObservable().subscribe((newCart) => {
    //   this.cartQuantity = newCart.totalCount;
    //   console.log(this.cartQuantity, "this.cartQuantity");
    //   console.log(newCart, "newCart");
  
    //   // Make sure this.content is defined before attempting to open the offcanvas
    //   if (this.content) {
    //     this.offcanvasService.open(this.content, { position: 'end' });
    //   }
    
    // });
 
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
      const newQuantity = newCart.totalCount;
      if (newQuantity > this.previousCartQuantity) {
        if (this.content) {
           this.offcanvasService.open(this.content, { position: 'end' });
            }
      }
    
      this.previousCartQuantity = newQuantity; // Update previous quantity
    });




    activatedRoute.params.subscribe((params) =>{
      if(params['searchTerm']){
        this.searchTerm = params['searchTerm'];
      }
    })

  
  }
  
  
  selectMenu(menu: any) {
    this.selectedMenu = menu;
  }
  cart!: Cart;
  ngOnInit(): void {
    this.menus = this.operationService.getAllProducts();
    this.selectedMenu = this.menus[0];
    // console.log(this.menus)


    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
     
    });
    this.getLoggedInUser();
  }
  isAuth: boolean = false;
  userName: any;
  userId = localStorage.getItem('userId');
  getLoggedInUser() {
    if (this.authService.isLoggedIn()) {

      this.authService.getUserById(this.userId).subscribe(userInfo => {     // Handle user info here
        console.log(userInfo);
        this.isAuth = true;
        this.userName = userInfo.data.firstName;
      });
    } else {
      // User is not logged in
     
      return;
    }

  }

  
  goToDashboard() {
    this.route.navigate(['dashboard']);
    this.getLoggedInUser();
    window.scrollTo(0, 0);
  }

  search(term: string){
    if(term){
this.route.navigateByUrl('/search/'+ term)
    }
  }

  showSideMenu = false;

  toggleSideMenu() {
    this.showSideMenu = !this.showSideMenu;
  }
  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const emailOrPhone = this.loginForm.value.emailOrPhone;
    const password = this.loginForm.value.password;

   

    // Handle the login result
    // switch (loginResult) {
    //   case 'success':
    //     // Redirect to the home page or navigate to a different component
    //     break;
    //   case 'Please check your internet connection.':
    //     // Display error message for internet connection
    //     break;
    //   case 'Invalid email/phone or password. Please try again.':
    //     // Display error message for invalid credentials
    //     break;
    //   default:
    //     // Display a generic error message
    //     break;
    // }
  }

  closeCartOffCanvas() {
    if (this.content) {
        this.content.dismiss();
    }
}

  openCartOffCanvas(content) {
		this.offcanvasService.open(content, { position: 'end' });
	}
  viewFood(route: number){
    this.route.navigate(['shop/view-product/', `${route}`]);
    window.scrollTo(0, 0);
      }

  checkoutRoute(){
    this.route.navigate(['checkout']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
      }
  cartRoute(){
    this.route.navigate(['cart']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
      }
  shopRoute(){
    this.route.navigate(['our-menu']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
      }


  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.toast.success({
      detail: 'Cart Update!',
      summary: 'Product removed Successfully',
      duration: 3000,
    });
  }

  
  categories: string[] = ['Category 1', 'Category 2', 'Category 3']; // Add more categories as needed
  selectedCategory: string = '';

 homeRoute(){
  this.route.navigate(['']);
  window.scrollTo(0, 0);
 }
 aboutRoute(){
  this.route.navigate(['about-us']);
  window.scrollTo(0, 0);
 }
 faqRoute(){
  this.route.navigate(['faq']);
  window.scrollTo(0, 0);
 }
 menuRoute(){
  this.route.navigate(['our-menu']);
  window.scrollTo(0, 0);
 }
 contactRoute(){
  this.route.navigate(['contact-us']);
  window.scrollTo(0, 0);
 }
}
