import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { AdminService } from 'src/app/Services/admin.service';
import { UserService } from 'src/app/Services/user.service';
import { applyGlobalSearch } from 'src/app/Shared/Helpers/global-table-search';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-rooms',
  templateUrl: './manage-rooms.component.html',
  styleUrls: ['./manage-rooms.component.css']
})
export class ManageRoomsComponent {
  roomForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private modalService: NgbModal, private adminService: AdminService) {

    this.roomForm = this.fb.group({
      // id: [null], // Assuming this is optional, otherwise set default value
      roomNumber: ['', Validators.required],
      roomName: ['', Validators.required],
      type: ['', Validators.required],
      description: [''],
      totalGuest: [null, Validators.required], // Assuming this is optional, otherwise set default value
      price: [null, Validators.required], // Assuming this is optional, otherwise set default value
      // duration: [null], // Assuming this is optional, otherwise set default value
      // totalPrice: [null], // Assuming this is optional, otherwise set default value
      isAvailable: [true],
      featuredImage: [''],
      image1: [''],
      image2: [''],
      image3: [''],
      status: [''],
      createdByUserId: [null], // Assuming this is optional, otherwise set default value
      createdByName: [''],
      // dateModified: [null], // Assuming this is optional, otherwise set default value
      // modifiedBy: [''],
      dateCreated: [null], // Assuming this is optional, otherwise set default value
    });

  }
  // selectedImages: string[] = [];
  selectedImageCount: number = 0;
  users: any;

  loading: any;
  selectedRoom = null;
  // selectedRooms = [];
  selectedRooms: any[] = [];
  multipleSelected = false;
  filteredRooms: any[] = [];
  private modalRef: NgbModalRef | undefined;

  currentPage: number = 1;
  itemsPerPage: number = 8;
  onSubmit = false;
  roomCategory: any;
  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAllRooms().subscribe((res: any) => {
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
    this.adminService.getAllCategories().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.loading = false;

       
        this.roomCategory = res.data;
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
  populateFields(){
const name = this.roomForm.value.type;

  }
  openAddModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      backdrop: 'static', // Make the modal static
      windowClass: 'scrollable-modal' // Apply custom styling for scrollable modal
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.dismiss();
      this.modalRef = undefined;
    }
  }
  response: any;
  addNewRoom() {
    // this.roomForm.value.id = parseInt(this.roomForm.value.id)
    this.roomForm.value.createdByUserId = 1;
    this.roomForm.value.isAvailable = true;
    this.roomForm.value.price = parseInt(this.roomForm.value.price)
    // this.roomForm.value.totalPrice = parseInt(this.roomForm.value.totalPrice)
    this.roomForm.value.dateCreated = Date.now
    console.log('addNewRoom', this.roomForm);
    this.onSubmit = true;
    this.adminService.addNewRoom(this.roomForm.value).subscribe((res: any) => {
      this.response = res;
      if (res.statusCode === 200) {
        this.onSubmit = false;
        this.loading = false;
        this.selectedImages = [];
        this.ngOnInit();
        this.closeModal();
        this.roomForm.reset()
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
        text: 'An error occurred while submitting',
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
  onImageSelectewd(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const totalSelectedImages = this.selectedImages.length;

      if (totalSelectedImages + files.length > 4) {
        // Display a warning if the total number of selected images exceeds 4
        alert('You can select only up to 4 photos.');
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith('image/')) {
          // Read the image file as a data URL
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.selectedImages.push({ file, url: e.target.result });

            //  Update the form values
            this.roomForm.get('featuredImage').setValue(this.selectedImages[0]);
            this.roomForm.get('image1').setValue(this.selectedImages[1]);
            this.roomForm.get('image2').setValue(this.selectedImages[2]);
            this.roomForm.get('image3').setValue(this.selectedImages[3]);
          };

          reader.readAsDataURL(file);
        }
      }
    }
  }

  onImageSelecteds(event: any) {
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
            this.selectedImages.push(file);
            this.selectedFiles.push(file);

            // Update the form values
            this.roomForm.get('featuredImage').setValue(this.selectedImages[0]);
            this.roomForm.get('image1').setValue(this.selectedImages[1]);
            this.roomForm.get('image2').setValue(this.selectedImages[2]);
            this.roomForm.get('image3').setValue(this.selectedImages[3]);
          }
        }
      }
    }
  }


  onImageSelectedWW(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      const totalSelectedImages = this.selectedImages.length;

      if (totalSelectedImages + files.length > this.maxImages) {
        Swal.fire({
          icon: 'warning',
          title: `You can select only up to ${this.maxImages} photos.`,
          confirmButtonText: 'OK',
        });
        event.target.value = ''; // Clear the input field
        this.roomForm.get('featuredImage').setValue(''); // Clear the form control
      } else {
        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          if (file.type.startsWith('image/')) {
            const reader = new FileReader();

            reader.onload = (e: any) => {
              this.selectedImages.push(e.target.result);
              this.selectedFiles.push(file);

              // Set the value of the form control
              this.roomForm.get('featuredImage').setValue(this.selectedImages[0]);
              this.roomForm.get('image1').setValue(this.selectedImages[1]);
              this.roomForm.get('image2').setValue(this.selectedImages[2]);
              this.roomForm.get('image3').setValue(this.selectedImages[3]);
            };

            reader.readAsDataURL(file);
          }
        }
      }
    }
  }

  onImageSelected(event: any) {
    const files = event.target.files;

    if (files && files.length > 0) {
      const totalSelectedImages = this.selectedImages.length;

      if (totalSelectedImages + files.length > 4) {
        Swal.fire
          ({
            icon: 'warning',
            title: `You can select only up to ${this.maxImages} photos.`,
            confirmButtonText: 'OK',
          });
        return;
      }

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith('image/')) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.selectedImages.push(e.target.result);

            // Update the form values
            switch (this.selectedImages.length) {
              case 1:
                this.roomForm.get('featuredImage').setValue(this.selectedImages[0]);
                break;
              case 2:
                this.roomForm.get('image1').setValue(this.selectedImages[1]);
                break;
              case 3:
                this.roomForm.get('image2').setValue(this.selectedImages[2]);
                break;
              case 4:
                this.roomForm.get('image3').setValue(this.selectedImages[3]);
                break;
            }
          };

          reader.readAsDataURL(file);
        }
      }
    }
  }


  // base64 string
  // onImageSelected(event: any) {
  //   if (event.target.files && event.target.files.length > 0) {
  //     const files = event.target.files;
  //     const totalSelectedImages = this.selectedImages.length;

  //     if (totalSelectedImages + files.length > this.maxImages) {
  //       Swal.fire({
  //         icon: 'warning',
  //         title: `You can select only up to ${this.maxImages} photos.`,
  //         confirmButtonText: 'OK',
  //       });
  //       event.target.value = '';
  //     } else {
  //       for (let i = 0; i < files.length; i++) {
  //         const file = files[i];

  //         if (file.type.startsWith('image/')) {
  //           const reader = new FileReader();

  //           reader.onload = (e: any) => {
  //             this.selectedImages.push(e.target.result);
  //             this.selectedFiles.push(file);

  //             // Update the form values
  //             this.roomForm.get('featuredImage').setValue(this.selectedImages[0]);
  //             this.roomForm.get('image1').setValue(this.selectedImages[1]);
  //             this.roomForm.get('image2').setValue(this.selectedImages[2]);
  //             this.roomForm.get('image3').setValue(this.selectedImages[3]);
  //           };

  //           reader.readAsDataURL(file);
  //         }
  //       }
  //     }
  //   }
  // }

  //   onImageSelected(event: any) {
  //     if (event.target.files && event.target.files.length > 0) {
  //       const files = event.target.files;
  //       const totalSelectedImages = this.selectedImages.length;

  //       if (totalSelectedImages + files.length > this.maxImages) {
  //         Swal.fire({
  //           icon: 'warning',
  //           title: `You can select only up to ${this.maxImages} photos.`,
  //           confirmButtonText: 'OK',
  //         });
  //         event.target.value = '';
  //       } else {
  //         for (let i = 0; i < files.length; i++) {
  //           const file = files[i];

  //           if (file.type.startsWith('image/')) {
  //             this.selectedImages.push(event.target.result);
  //             this.selectedFiles.push(file);
  // console.log(`selected1: ${event.target.result}`);
  // console.log(`this.selectedImages: ${this.selectedImages}`);
  // //             //  Update the form values
  //               this.roomForm.get('featuredImage').setValue(this.selectedImages[0]);
  //               this.roomForm.get('image1').setValue(this.selectedImages[1]);
  //               this.roomForm.get('image2').setValue(this.selectedImages[2]);
  //               this.roomForm.get('image3').setValue(this.selectedImages[3]);
  //           }
  //         }
  //       }
  //     }
  //   }



  removeImage(index: number) {
    this.selectedImages.splice(index, 1);
    this.selectedImageCount = this.selectedImages.length;

    // Show the file input when an image is removed
    if (this.selectedImageCount < 5) {
      const fileInput = document.getElementById('featuredImage') as HTMLInputElement;
      if (fileInput) {
        fileInput.removeAttribute('hidden');
      }
    }
  }

  // This method sets an image as featured
  setAsFeatured(index: number) {
    // You can add logic here to differentiate the featured image
    // For example, you can add a CSS class to the featured image
    // or store the index of the featured image in a separate variable
  }

  // Remove selected image
  removeSelectedImage(index: number) {
    this.selectedImages.splice(index, 1);
  }


  selectAllRows() {
    // room.selected = !room.selected;
  }

  selectRow(room: any) {
    room.selected = !room.selected;

    if (room.selected) {
      this.selectedRooms.push(room);
    } else {
      const index = this.selectedRooms.indexOf(room);
      if (index !== -1) {
        this.selectedRooms.splice(index, 1);
      }
    }
  }

  hasSelectedRooms() {
    return this.selectedRooms.length > 0;
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

  viewRoom(room: any) {
    // Implement view logic here
  }

  editRoom(room: any) {
    // Implement edit logic here
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
