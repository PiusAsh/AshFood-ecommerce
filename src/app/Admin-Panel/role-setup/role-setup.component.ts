import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { AdminService } from 'src/app/Services/admin.service';
import { applyGlobalSearch } from 'src/app/Shared/Helpers/global-table-search';

@Component({
  selector: 'app-role-setup',
  templateUrl: './role-setup.component.html',
  styleUrls: ['./role-setup.component.css']
})
export class RoleSetupComponent implements OnInit {
  


  currentTab: string = 'Role Information';
  activeTab: string = 'role'; // Default active tab

  // Function to switch to a specific tab
  switchTab(tabName: string) {
    this.activeTab = tabName;
  }
 
  
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
  roles: any;
  loading: any;
  role = null;
  selectedRoles = [];
  multipleSelected = false;
  filteredRoles: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 8;
  onSubmit = false;
  ngOnInit(): void {
    // this.loading = true;
    this.adminService.getAllRoles().subscribe((res: any) => {
      this.roles = res.data;
      this.filteredRoles = res.data;
      console.log(this.roles);
      this.loading = false;
    })
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
      // this.roles.push(res.data);
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
      this.selectedRoles.push(category);
    } else {
      const index = this.selectedRoles.indexOf(category);
      if (index !== -1) {
        this.selectedRoles.splice(index, 1);
      }
    }
  }

  hasSelectedRoles() {
    return this.selectedRoles.length > 0;
  }

  canShowViewEditButtons() {
    return this.selectedRoles.length === 1;
  }

  deleteSelectedRoles() {
    // Implement delete logic for selectedRoles
    for (const category of this.selectedRoles) {
      const index = this.roles.indexOf(category);
      if (index !== -1) {
        this.roles.splice(index, 1);
      }
    }
    this.selectedRoles = [];
  }

  viewRole(category) {
    // Implement view logic here
  }

  editRole(category) {
    // Implement edit logic here
  }

  searchText: string = "";
  applyFilter() {
    this.filteredRoles = applyGlobalSearch(
      this.roles,
      this.searchText,
      ['name', 'description', 'numberOfGuests', 'userId', 'status', 'dateCreated']
    );
  }



}
