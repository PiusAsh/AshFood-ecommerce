
import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from 'src/app/Services/admin.service';
import { BookingService } from 'src/app/Services/booking.service';
import { OperationService } from 'src/app/Services/operation.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})

export class AboutComponent implements OnInit {
  foods: any;
  selectedMenu: any;
  selectedCategory: any;
  categorie1s: any;
  menus: any[] = [];
  // selectedCategory: string | null = null;
  categories: string[] = [];
  products: any[] = [
    // ...dummy data with 20 records...
  ];
  
  private modalRef: NgbModalRef | undefined;
    constructor( private activatedRoute: ActivatedRoute, private modalService: NgbModal, private operationService: OperationService, private route: Router) { }
  foodResult: any;
    ngOnInit() {
  
      this.products = this.operationService.getAllProducts();
      this.loadCategories();
      this.selectedCategory = this.categories[0];
  
      this.activatedRoute.params.subscribe((params) =>{
        if(params['searchTerm']){
  this.foods = this.operationService.getAllFoodsBySearch(params['searchTerm']);
  console.log(this.foods, 'this.foods')
  this.foodResult = this.foods.length > 0;
        }else{
          this.operationService.getAllProducts()
        }
      })
    }
    viewCartModal(viewCartParam: any) {
      this.modalRef = this.modalService.open(viewCartParam, { backdrop: 'static' });
    }
  
  
  
    loadCategories(): void {
      this.categories = Array.from(new Set(this.products.map(product => product.category)));
    }
  
    getProductsByCategory(category: string): any[] {
      return this.products.filter(product => product.category === category);
    }
  
    selectCategory(category: string): void {
      this.selectedCategory = category;
    }
  
  
    getProductsByCategory3(menu: any) {
      this.selectedMenu = menu;
    }
}