import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from 'src/app/Services/admin.service';
import { applyGlobalSearch } from 'src/app/Shared/Helpers/global-table-search';

@Component({
  selector: 'app-room-category',
  templateUrl: './room-category.component.html',
  styleUrls: ['./room-category.component.css']
})
export class RoomCategoryComponent implements OnInit {


  categoryForm: FormGroup
  constructor(private fb: FormBuilder, private adminService: AdminService, private toast: NgToastService, private modalService: NgbModal) {
    this.categoryForm = fb.group({
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      numberOfGuests: ['', Validators.required],
      userId: [''],
      status: ['Active'],
      dateCreated: [''],
      createdByName: [''],
      createdByUserId: [''],
      dateModified: [''],
      modifiedBy: [''],
    });
  }
  categories: any;
  loading: any;
  selectedCategory = null;
  selectedCategories = [];
  multipleSelected = false;
  filteredCategories: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  onSubmit = false;
  ngOnInit(): void {
    this.loading = true;
    this.adminService.getAllCategories().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.loading = false;

        this.categories = res.data;
        this.filteredCategories = res.data;
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

  addNewCategory() {
    this.onSubmit = true;
    console.log("Add New Category", this.categoryForm.value)
    this.categoryForm.value.status = 'Active';
    this.categoryForm.value.createdByUserId = Number(1);
    this.categoryForm.value.createdByName = 'Pius Ash';
    this.categoryForm.value.dateModified = new Date;
    this.categoryForm.value.id = Number(this.categoryForm.value.id);
    this.categoryForm.value.dateCreated = new Date;
    this.categoryForm.value.userId = 2;
    this.adminService.AddNewCategory(this.categoryForm.value).subscribe((res: any) => {
      this.onSubmit = false;
      if (res.statusCode == 200) {
       
        this.toast.success({
          detail: res.responseMessage,
          // summary: res.responseMessage,
        });
      } else {
        this.toast.warning({
          detail: res.responseMessage,
          // summary: '',
        });
      }

      console.log("Add New Category", res)
      // this.categories.push(res.data);
      this.ngOnInit()
      this.categoryForm.reset();
    }, error => {
      console.log("Error", error);
      this.onSubmit = false;
      this.toast.error({
        detail: 'Oops! Something went wrong',
        summary: 'Please try again',
      });
    })
  }



  openAddModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      backdrop: 'static', // Make the modal static
      windowClass: 'scrollable-modal' // Apply custom styling for scrollable modal
    });
  }

  selectAllRows() {
    // category.selected = !category.selected;
  }

  selectRow(category) {
    category.selected = !category.selected;

    if (category.selected) {
      this.selectedCategories.push(category);
    } else {
      const index = this.selectedCategories.indexOf(category);
      if (index !== -1) {
        this.selectedCategories.splice(index, 1);
      }
    }
  }

  hasSelectedCategories() {
    return this.selectedCategories.length > 0;
  }

  canShowViewEditButtons() {
    return this.selectedCategories.length === 1;
  }

  deleteSelectedCategories() {
    // Implement delete logic for selectedCategories
    for (const category of this.selectedCategories) {
      const index = this.categories.indexOf(category);
      if (index !== -1) {
        this.categories.splice(index, 1);
      }
    }
    this.selectedCategories = [];
  }

  viewCategory(category) {
    // Implement view logic here
  }

  editCategory(category) {
    // Implement edit logic here
  }

  searchText: string = "";
  applyFilter() {
    this.filteredCategories = applyGlobalSearch(
      this.categories,
      this.searchText,
      ['name', 'description', 'numberOfGuests', 'userId', 'status', 'dateCreated']
    );
  }

}
