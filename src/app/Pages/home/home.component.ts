import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Cart } from 'src/app/Models/cart';
import { CartItem } from 'src/app/Models/cartItem';
import { Product } from 'src/app/Models/product';
import { CartService } from 'src/app/Services/cart.service';
import { CategoryService } from 'src/app/Services/category.service';
import { OperationService } from 'src/app/Services/operation.service';
import { ProductService } from 'src/app/Services/product.service';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  foods: any;
  selectedMenu: any;
  selectedCategory: any;
  categorie1s: any;
  menus: any[] = [];
  // selectedCategory: string | null = null;
  categories: any;
  @ViewChild('content') content: NgbOffcanvas;
  cartQuantity: number = 1;
  products: any;
  cart!: Cart;
  AllAddedItems: any;
  searchTerm = "";
  previousCartQuantity: number = 0;
  loading: boolean = false;
  search(term: string) {
    if (term) {
      this.route.navigateByUrl('/search/' + term)
    }
  }

  private modalRef: NgbModalRef | undefined;
  // ifAddedToCart: boolean = false;
  NotInCart: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private categoryService: CategoryService, private productService: ProductService, private offcanvasService: NgbOffcanvas, private toast: NgToastService, private cartService: CartService, private modalService: NgbModal, private operationService: OperationService, private route: Router) {


    //       this.cartService.getCartObservable().subscribe((cart) => {
    //         this.cart = cart;
    // this.AllAddedItems = cart.items;
    //         console.log(this.AllAddedItems, "AllAddedItems");

    //       });

    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cart = newCart;
      this.AllAddedItems = newCart.items;
      console.log(this.AllAddedItems, "AllAddedItems");
      this.cartQuantity = newCart.totalCount;
      const newQuantity = newCart.totalCount;
      console.log(newQuantity, "newQuantity");
      console.log(newCart, "newCart");

      if (newQuantity > this.previousCartQuantity) {
        if (this.content) {
          this.offcanvasService.open(this.content, { position: 'end' });
        }
      }

      this.previousCartQuantity = newQuantity; // Update previous quantity
    });
  }
  foodResult: any;
  food: any;
  onSubmit: boolean = false;
  bgColors: string[] = ['bg-success', 'bg-info', 'bg-warning', 'bg-danger'];
  bgImages: string[] = [
    '/assets/images/green.png',
    // '/assets/images/blue.jpg',
    '/assets/images/burnt.jpg',
  ];
  scrollLeft() {
    const wrapper = document.querySelector('.wrapper-item');
    const scrollAmount = 200; // Adjust as needed

    if (wrapper) {
        wrapper.scrollBy({
            top: 0,
            left: -scrollAmount,
            behavior: 'smooth'
        });
    }
}

 scrollRight() {
    const wrapper = document.querySelector('.wrapper-item');
    const scrollAmount = 200; // Adjust as needed

    if (wrapper) {
        wrapper.scrollBy({
            top: 0,
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}
  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.toast.success({
      detail: 'Cart Update!',
      summary: 'Product has been removed successfully',
      duration: 3000,
    });
  }
  ngOnInit() {
    this.getAllProducts();
    this.getCategories();

    this.getSearchResult();

  }
  getAllProducts() {
    this.loading = true;
    this.productService.getAllProducts().subscribe(
      (products: any) => {
        if (products.statusCode === 200) {
          if (products.data.length) {
            this.products = products.data;
            this.loading = false;
            console.log(this.products, 'products');
            this.calculateProductsPerCategory();
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
        this.loading = false;
        console.error('Error fetching products:', error);
      }
    )
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe(
      (products: any) => {
        if (products.statusCode === 200) {
          if (products.data.length) {
            this.categories = products.data;

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
        console.error('Error fetching category:', error);
      }
    )
  }
categoryLength: any;
calculateProductsPerCategory() {
  this.categories.forEach(category => {
    const productsForCategory = this.products.filter(product => product.category === category.name);
    console.log(`Category: ${category.name}, Products: ${productsForCategory.length}`);
    category.length = productsForCategory.length;
  });
}
featuredCategories: string[] = [];
  getSearchResult() {
    this.activatedRoute.params.subscribe((params) => {
      if (params['searchTerm']) {
        this.foods = this.productService.getAllFoodsBySearch(params['searchTerm']);
        console.log(this.foods, 'this.foods')
        this.foodResult = this.foods.length > 0;
      } else {
        this.getAllProducts();
      }
    })
  }

  // getAllProducts(){
  //   this.productService.getAllProducts().subscribe((data: any) =>{
  //     this.products = data.data;
  //     console.log(this.products, 'this.foods')
  //   })
  // }

  viewCartModal(viewCartParam: any) {
    this.modalRef = this.modalService.open(viewCartParam, { backdrop: 'static' });
  }



  loadCategories(): void {
    this.featuredCategories = Array.from(new Set(this.products.map(product => product.category)));
    console.log(this.featuredCategories, 'categories');
  }

  productsToDisplay: any;
  getProductsByCategory(category: string): any[] {
    this.productsToDisplay = this.products.filter(product => product.category === category)
    return this.products.filter(product => product.category === category);
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
  }


  ifAddedToCart(product: any): boolean {
    // Check if the product is in the list of added items (cart)
    const cartItem = this.AllAddedItems.find((item) => item.food.id === product.id);

    // Return true if the product is in the cart, otherwise, return false
    return !!cartItem;
  }



  buttonText = "Add To Cart";
  isLoading = false;

  productCart: any;
  addToCart(product) {
    this.onSubmit = true;
    this.cartService.addToCart(product);
  }

  scrollTop() {
    window.scrollTo(0, 0);
  }
  listCurrentPage = 1;
  listPageSize = 12; // Number of items per page


  viewFood(route: number) {
    this.route.navigate(['view-food/', `${route}`]);
    window.scrollTo(0, 0);
  }

  viewAllProduct() {
    this.route.navigate(['our-menu']);
    window.scrollTo(0, 0);
  }




  closeCartOffCanvas() {
    if (this.content) {
      this.content.dismiss();
    }
  }

  openCartOffCanvas(content) {
    this.offcanvasService.open(content, { position: 'end' });
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
    this.route.navigate(['cart']);
    window.scrollTo(0, 0);
    this.closeCartOffCanvas();
  }
  showSideMenu = false;

  toggleSideMenu() {
    this.showSideMenu = !this.showSideMenu;
  }

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
