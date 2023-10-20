import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/cartItem';
import { AdminService } from 'src/app/Services/admin.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CartService } from 'src/app/Services/cart.service';
import { OperationService } from 'src/app/Services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedMenu: any;
  menus: any[] = [];
  searchTerm = "";
  loginForm: FormGroup;
  cartQuantity: number = 1;
  @ViewChild('content') content: NgbOffcanvas;
  previousCartQuantity: number = 0;
  searchMenu: FormGroup;
  offcanvasRef: NgbOffcanvas;
  constructor(private operationService: OperationService, private router: Router, private authService: AuthenticationService, private offcanvasService: NgbOffcanvas, private toast: NgToastService, private adminService: AdminService, private activatedRoute: ActivatedRoute, private route: Router, private formBuilder: FormBuilder, private cartService: CartService) {


    this.loginForm = this.formBuilder.group({
      emailOrPhone: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.searchMenu = this.formBuilder.group({
      menuName: ['Select Menu Category'],
    });


    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
      const newQuantity = newCart.totalCount;
      console.log(newQuantity, "newQuantity");
      console.log(newCart, "newCart");

      this.previousCartQuantity = newQuantity; // Update previous quantity
    });




    activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
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
    console.log(this.menus)


    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
    });

    this.getLoggedInUser();
  }

  search(term: string) {
    if (term) {
      this.route.navigateByUrl('/search/' + term)
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

  closeCartOffCanvas() {
    if (this.content) {
      this.content.dismiss();
    }
  }

  openCartOffCanvas(content) {
    this.offcanvasService.open(content, { position: 'end' });
  }
  viewFood(route: number) {
    this.route.navigate(['view-food/', `${route}`]);
    window.scrollTo(0, 0);
  }

  checkoutRoute() {
    this.route.navigate(['checkout']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
  }
  cartRoute() {
    this.route.navigate(['cart']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
  }
  shopRoute() {
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

  homeRoute() {
    this.route.navigate(['']);
    window.scrollTo(0, 0);
  }
  aboutRoute() {
    this.route.navigate(['about-us']);
    window.scrollTo(0, 0);
  }
  faqRoute() {
    this.route.navigate(['faq']);
    window.scrollTo(0, 0);
  }
  menuRoute() {
    this.route.navigate(['our-menu']);
    window.scrollTo(0, 0);
  }
  contactRoute() {
    this.route.navigate(['contact-us']);
    window.scrollTo(0, 0);
  }
}
