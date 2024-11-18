
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from './Services/authentication.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ASH FOOD - A taste of home';

  shouldDisplayContent: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router, private authService: AuthenticationService, private toast: NgToastService,
  ) { }
  isAuth: boolean = false;
  ngOnInit(): void {
    // this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(() => {
    //     this.shouldDisplayContent = this.shouldDisplayHeaderOnCurrentRoute(this.route);
    //   });
  }

  // private shouldDisplayHeaderOnCurrentRoute(route: ActivatedRoute): boolean {
  //   const allowShowHeaderAndSidebar = ['dashboard', 'manage-users', 'dashboard', 'manage-reviews', 'manage-products',
  //     'manage-categories', 'manage-bookings', 'manage-users', 'role-setup', 'profile', 'report'];

  //   if (route.firstChild) {
  //     const childRoute = route.firstChild;
  //     const routePath = childRoute.snapshot.routeConfig?.path || '';

  //     // Check if the routePath matches one of the showHeaderRoutes
  //     if (allowShowHeaderAndSidebar.includes(routePath)) {
  //       // this.getLoggedInUser();
  //       return true;
  //     }
  //   }
  //   this.isAuth = false;
  //   return false;
  // }
  // userName: any;

  // userId = localStorage.getItem('userId');
  // getLoggedInUser() {
  //   if (this.authService.isLoggedIn()) {

  //     this.authService.getUserById(this.userId).subscribe(userInfo => {     // Handle user info here
  //       console.log(userInfo);
  //       this.isAuth = true;
  //       this.userName = userInfo.data.firstName;
  //     });
  //   } else {
  //     // User is not logged in
  //     this.router.navigate(['/login']);
  //     this.toast.warning({
  //       detail: 'Unauthorized',
  //       duration: 5000, position: 'topRight',
  //       summary: 'Please login to proceed',
  //     });
  //   }

  // }
}
