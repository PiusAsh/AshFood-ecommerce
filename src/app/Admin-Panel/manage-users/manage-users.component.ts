import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/Services/user.service';
import { applyGlobalSearch } from 'src/app/Shared/Helpers/global-table-search';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  
  constructor(private userService: UserService, private fb: FormBuilder, private modalService: NgbModal) {
  
  }
  users: any;

  loading: any;
  selectedUser = null;
  // selectedUsers = [];
  selectedUsers: any[] = [];
  multipleSelected = false;
  filteredUsers: any[] = [];


  currentPage: number = 1;
  itemsPerPage: number = 8;
  onSubmit = false;
  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.loading = false;

        this.users = res.data;
        this.filteredUsers = res.data;
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

  openAddModal(content: any) {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-title',
      backdrop: 'static', // Make the modal static
      windowClass: 'scrollable-modal' // Apply custom styling for scrollable modal
    });
  }


  addNewCategory() {
    this.onSubmit = true;

  }

 
  selectAllRows() {
    // category.selected = !category.selected;
  }

  selectRow(category: any) {
    category.selected = !category.selected;

    if (category.selected) {
      this.selectedUsers.push(category);
    } else {
      const index = this.selectedUsers.indexOf(category);
      if (index !== -1) {
        this.selectedUsers.splice(index, 1);
      }
    }
  }

  hasSelectedCategories() {
    return this.selectedUsers.length > 0;
  }

  canShowViewEditButtons() {
    return this.selectedUsers.length === 1;
  }

  deleteSelectedCategories() {
    // Implement delete logic for selectedUsers
    for (const category of this.selectedUsers) {
      const index = this.users.indexOf(category);
      if (index !== -1) {
        this.users.splice(index, 1);
      }
    }
    this.selectedUsers = [];
  }

  viewCategory(category: any) {
    // Implement view logic here
  }

  editCategory(category: any) {
    // Implement edit logic here
  }

  searchText: string = "";
  applyFilter() {
    this.filteredUsers = applyGlobalSearch(
      this.users,
      this.searchText,
      ['firstName', 'lastName', 'gender', 'address', 'email', 'phoneNo', 'role', 'status', 'state', 'dateCreated']
    );
  }

 


}
