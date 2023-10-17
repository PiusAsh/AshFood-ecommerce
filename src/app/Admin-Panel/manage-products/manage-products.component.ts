import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from 'src/app/Services/admin.service';
import { CategoryService } from 'src/app/Services/category.service';
import { ProductService } from 'src/app/Services/product.service';
import { UserService } from 'src/app/Services/user.service';
import { formatCurrency } from 'src/app/Shared/Helpers/currency-format';
import { applyGlobalSearch } from 'src/app/Shared/Helpers/global-table-search';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent {
  AddProductForm: FormGroup;
  editProductForm: FormGroup;
  viewProductForm: FormGroup;
  selectedTab: string = 'all';

  constructor(private userService: UserService, private fb: FormBuilder, private modalService: NgbModal, private categoryService: CategoryService,
      private productService: ProductService) {

    this.AddProductForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required], 
      isAvailable: [true],
      thumbnail: [''],
      image1: [''],
      image2: [''],
      image3: [''],
      status: [''],
      category: [''],
      createdByUserId: [null], 
      createdByName: [''],
      dateCreated: [null], 
    });
    this.editProductForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required], 
      isAvailable: [true],
      thumbnail: [''],
      image1: [''],
      image2: [''],
      image3: [''],
      status: [''],
      category: [''],
      createdByUserId: [null], 
      createdByName: [''],
      dateCreated: [null], 
    });
    this.viewProductForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      description: [''],
      price: [null, Validators.required], 
      isAvailable: [true],
      thumbnail: [''],
      image1: [''],
      image2: [''],
      image3: [''],
      status: [''],
      category: [''],
      createdByUserId: [null], 
      createdByName: [''],
      dateCreated: [null], 
    });

  }
  // selectedImages: string[] = [];
  selectedImageCount: number = 0;
  users: any;

  loading: any;
  selectedRoom = null;
  // selectedRooms = [];
  // selectedRooms: any[] = [];
  selectedRooms: any[] = [];
  multipleSelected = false;
  filteredRooms: any[] = [];
  private modalRef: NgbModalRef | undefined;

  currentPage: number = 1;
  itemsPerPage: number = 8;
  onSubmit = false;
  productCategory: any;
  ngOnInit(): void {
    this.loading = true;
    this.getProductCategories();
    this.getAllProducts(); 
    
  }
  getAllProducts(){
    this.productService.getAllProducts().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.loading = false;

        this.users = res.data;
        this.filteredRooms = res.data;
      } else {
        this.loading = false;
      }

    }, (err: any) => {
      if (err) {
        console.log(err);
        this.loading = false;
      }
    }
    )
  }


 getProductCategories(){
  this.categoryService.getAllCategories().subscribe((res: any) => {
    if (res.statusCode === 200) {
      this.loading = false;     
      this.productCategory = res.data;
      console.log(this.productCategory, "Product Category")
    } else {
      this.loading = false;
    }

  }, (err: any) => {
    if (err) {
      console.log(err);
      this.loading = false;
    }
  }
  )
 }

 viewRoom(product: any){
   console.log(product, 'Product');
  this.productService.getProductId(product.id).subscribe((res: any) => {
    console.log(res, 'Product');
    if (res.statusCode === 200) {
      this.loading = false;     
      
    } else {
      this.loading = false;
    }

  }, (err: any) => {
    if (err) {
      console.log(err);
      this.loading = false;
    }
  }
  )
 }

//  editProduct(product: any){
//   console.log(product, 'Product');
//  this.productService.getProductId(product.id).subscribe((res: any) => {
//    console.log(res, 'Product');
//    if (res.statusCode === 200) {
//      this.loading = false; 
//      this.editProductForm.value.patchValue({
//       id: res.data.id,
//       name : res.data.name,
//       description : res.data.description,
//       price : res.data.price,
//       isAvailable : res.data.isAvailable,
//       thumbnail : res.data.thumbnail,
//       image1 : res.data.thumbnail,
//       image2 : res.data.thumbnail,
//       image3 : res.data.thumbnail,
//       status : res.data.thumbnail,
//       category : res.data.thumbnail,
//       createdByUserId : res.data.thumbnail,
//       createdByName : res.data.thumbnail,
//       dateCreated : res.data.thumbnail,
//      })
// this.selectedImages[0] = res.data.thumbnail;
// this.selectedImages[1] = res.data.image1;
// this.selectedImages[2] = res.data.image2;
// this.selectedImages[3] = res.data.image3;
//      console.log(this.editProductForm.value, 'editProduct FROM')
//    } else {
//      this.loading = false;
//    }

//  }, (err: any) => {
//    if (err) {
//      console.log(err);
//      this.loading = false;
//    }
//  }
//  )
// }

editProduct() {
  if (this.selectedRooms.length === 1) {
    // Assuming editProduct is a function to handle editing a room
  
    console.log(this.selectedRooms, 'Product');
    this.productService.getProductId(this.selectedRooms[0].id).subscribe((res: any) => {
      console.log(res, 'Product');
      if (res.statusCode === 200) {
        this.loading = false; 
        this.editProductForm.patchValue({
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          isAvailable: res.data.isAvailable,
          thumbnail: res.data.thumbnail,
          image1: res.data.image1,
          image2: res.data.image2,
          image3: res.data.image3,
          status: res.data.status,
          category: res.data.category,
          createdByUserId: res.data.createdByUserId,
          createdByName: res.data.createdByName,
          dateCreated: res.data.dateCreated,
        });
  
        this.selectedImages[0] = res.data.thumbnail;
        this.selectedImages[1] = res.data.image1;
        this.selectedImages[2] = res.data.image2;
        this.selectedImages[3] = res.data.image3;
  
        console.log(this.editProductForm.value, 'editProduct FROM');
      } else {
        this.loading = false;
      }
    }, (err: any) => {
      if (err) {
        console.log(err);
        this.loading = false;
      }
    });
  }

}
viewProduct() {
  if (this.selectedRooms.length === 1) {
    // Assuming editProduct is a function to handle editing a room
  
    console.log(this.selectedRooms, 'Product');
    this.productService.getProductId(this.selectedRooms[0].id).subscribe((res: any) => {
      console.log(res, 'Product');
      if (res.statusCode === 200) {
        this.loading = false; 
        this.viewProductForm.patchValue({
          id: res.data.id,
          name: res.data.name,
          description: res.data.description,
          price: res.data.price,
          isAvailable: res.data.isAvailable,
          thumbnail: res.data.thumbnail,
          image1: res.data.image1,
          image2: res.data.image2,
          image3: res.data.image3,
          status: res.data.status,
          category: res.data.category,
          createdByUserId: res.data.createdByUserId,
          createdByName: res.data.createdByName,
          dateCreated: res.data.dateCreated,
        });
  
        this.selectedImages[0] = res.data.thumbnail;
        this.selectedImages[1] = res.data.image1;
        this.selectedImages[2] = res.data.image2;
        this.selectedImages[3] = res.data.image3;
  
        console.log(this.editProductForm.value, 'editProduct FROM');
      } else {
        this.loading = false;
      }
    }, (err: any) => {
      if (err) {
        console.log(err);
        this.loading = false;
      }
    });
  }

}

  openAddModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      backdrop: 'static', // Make the modal static
      windowClass: 'scrollable-modal' // Apply custom styling for scrollable modal
    });
    this.AddProductForm.value.category = "Select Category";
  }

  updateProduct(){

  }
  closeModal() {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = undefined;
    }
  }
  response: any;
  addNewProduct() {
    this.AddProductForm.value.createdByUserId = 1;
    this.AddProductForm.value.isAvailable = true;
    this.AddProductForm.value.price = parseInt(this.AddProductForm.value.price);
    this.AddProductForm.value.thumbnail = this.selectedImages[0];
    this.AddProductForm.value.image1 = this.selectedImages[1];
    this.AddProductForm.value.image2 = this.selectedImages[2];
    this.AddProductForm.value.image3 = this.selectedImages[3];
    this.AddProductForm.value.dateCreated = Date.now;
    this.AddProductForm.value.status = "Active";
    this.AddProductForm.value.createdByName = "System Administrator";
    this.AddProductForm.value.createdByUserId = 2;
    console.log('addNewRoom', this.AddProductForm);
    this.onSubmit = true;
    this.productService.addNewProduct(this.AddProductForm.value).subscribe((res: any) => {
      this.response = res;
      if (res.statusCode === 200) {
        this.onSubmit = false;
        this.loading = false;
        this.selectedImages = [];
        this.ngOnInit();
        this.closeModal();
        this.AddProductForm.reset()
        Swal.fire({
          icon: 'success',
          title: 'Successful!',
          text: res.responseMessage,
          confirmButtonText: 'OK',
        });
      } else {
        this.loading = false;
        this.onSubmit = false;

        Swal.fire({
          icon: 'error',
          title: '',
          text: res.responseMessage,
          confirmButtonText: 'OK',
        });
      }

    }, (err: any) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Oops!',
        text: err.error.responseMessage,
        confirmButtonText: 'OK',
      });
      this.loading = false;
      this.onSubmit = false;
    }
    )


  }

  // Define a maximum number of allowed images
  private maxImages = 4;
  selectedFiles: File[] = [];
  selectedImages: { file: File, url: string }[] = [];
 
  onImageSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      const totalSelectedImages = this.selectedImages.length;
  
      if (totalSelectedImages + files.length > this.maxImages) {
        Swal.fire({
          icon: 'warning',
          title: `You can select only up to ${this.maxImages} photos.`,
          confirmButtonText: 'OK',
        });
        event.target.value = '';
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
  
          if (file.type.startsWith('image/')) {
            const reader = new FileReader();
  
            reader.onload = (e: any) => {
              const base64String = e.target.result;
              this.selectedImages.push(base64String);
              this.selectedFiles.push(file);
  
              // Update the form values
              this.AddProductForm.get('featuredImage').setValue(this.selectedImages[0]);
              this.AddProductForm.get('image1').setValue(this.selectedImages[1]);
              this.AddProductForm.get('image2').setValue(this.selectedImages[2]);
              this.AddProductForm.get('image3').setValue(this.selectedImages[3]);
            };
  
            reader.readAsDataURL(file);
          }
        }
      }
    }
  }
  
  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.selectedFiles.splice(index, 1);
  
    // Update the form values and reset thumbnail if needed
    this.AddProductForm.get('featuredImage').setValue(this.selectedImages[0]);
    this.AddProductForm.get('image1').setValue(this.selectedImages[1]);
    this.AddProductForm.get('image2').setValue(this.selectedImages[2]);
    this.AddProductForm.get('image3').setValue(this.selectedImages[3]);
  }
  productPrice: number;
  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^\d.]/g, '');
    value = formatCurrency(parseFloat(value));
    input.value = value;
  }
  
  setAsFeatured(index: number) {
    // If the selected image is already the featured image, do nothing
    if (index === 0) {
      return;
    }
  
    // Swap the selected image with the first image
    const tempImage = this.selectedImages[0];
    this.selectedImages[0] = this.selectedImages[index];
    this.selectedImages[index] = tempImage;
  
    const tempFile = this.selectedFiles[0];
    this.selectedFiles[0] = this.selectedFiles[index];
    this.selectedFiles[index] = tempFile;
  
    // Update the form values
    const featuredImageControl = this.AddProductForm.get('featuredImage');
    const image1Control = this.AddProductForm.get('image1');
    const image2Control = this.AddProductForm.get('image2');
    const image3Control = this.AddProductForm.get('image3');
  
    if (featuredImageControl && image1Control && image2Control && image3Control) {
      const featuredImageValue = featuredImageControl.value;
      featuredImageControl.setValue(this.selectedImages[0]);
      image1Control.setValue(this.selectedImages[1]);
      image2Control.setValue(this.selectedImages[2]);
      image3Control.setValue(this.selectedImages[3]);
  
      // Update other form controls if needed
      if (index === 0) {
        image1Control.setValue(featuredImageValue);
      }
    }
  }
  
 

  // Remove selected image
  removeSelectedImage(index: number) {
    this.selectedImages.splice(index, 1);
  }


  selectAllRows() {
    // room.selected = !room.selected;
  }

  // selectRow(room: any) {
  //   room.selected = !room.selected;
    

  //   if (room.selected) {
  //     this.selectedRooms.push(room);
  //   } else {
  //     const index = this.selectedRooms.indexOf(room);
  //     if (index !== -1) {
  //       this.selectedRooms.splice(index, 1);
  //     }
  //   }
  // }
  // selectRow(room: any) {
  //   // Deselect all previously selected rooms
  //   this.selectedRooms.forEach(selectedRoom => selectedRoom.selected = false);
  
  //   // Select the clicked room
  //   room.selected = true;
  
  //   // Update the selectedRooms array with the clicked room
  //   this.selectedRooms = [room];
  // }
  selectRow(room: any) {
    if (this.selectedRooms.length === 1 && this.selectedRooms[0] === room) {
      // If the clicked room is the only selected room, deselect it
      room.selected = false;
      
      this.selectedRooms = [];
    } else {
      // Deselect all previously selected rooms
      this.selectedRooms.forEach(selectedRoom => selectedRoom.selected = false);
  
      // Select the clicked room
      room.selected = true;
  
      // Update the selectedRooms array with the clicked room
      this.selectedRooms = [room];
    }
  }
  backToDefault(){
    this.selectedTab = 'all';
    this.selectedRooms = [];
    this.editProductForm.reset();
    this.AddProductForm.reset();
    // Unselect all checkboxes
    this.filteredRooms.forEach(room => room.selected = false);
  }
  
  
  
  hasSelectedRooms() {
    return this.selectedRooms.length;
  }

  canShowViewEditButtons() {
    return this.selectedRooms.length === 1;
  }

  deleteSelectedRooms() {
    // Implement delete logic for selectedRooms
    for (const room of this.selectedRooms) {
      const index = this.users.indexOf(room);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    }
    this.selectedRooms = [];
  }

  

  

  searchText: string = "";
  applyFilter() {
    this.filteredRooms = applyGlobalSearch(
      this.users,
      this.searchText,
      ['roomName', 'roomNumber', 'type', 'totalGuest', 'price', 'isAvailable', 'createdByName', 'state', 'dateCreated']
    );
  }




}
