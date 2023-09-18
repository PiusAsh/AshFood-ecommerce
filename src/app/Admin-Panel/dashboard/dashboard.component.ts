import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService, private fb: FormBuilder, private modalService: NgbModal) {
  
  }
  TotalUsers: any;

  loading: any;


  ngOnInit(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.loading = false;

        this.TotalUsers = res.data.length;
        
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

}
