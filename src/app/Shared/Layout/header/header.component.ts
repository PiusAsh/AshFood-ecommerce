import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  breadcrumb: string = '';
  loggedInUsername: string = '';
  shouldDisplayHeader: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router, private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
this.getLoggedInUser();
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.shouldDisplayHeader = this.shouldDisplayHeaderOnCurrentRoute(this.route.root);
      });

    
    

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumb = this.extractBreadcrumb(this.route.root);
      });
  }

  private shouldDisplayHeaderOnCurrentRoute(route: ActivatedRoute): boolean {
    // Define the routes where the header should be displayed
    const showHeaderRoutes = ['dashboard', '', 'manage-users'];
  
    if (route.firstChild) {
      const childRoute = route.firstChild;
      const routePath = childRoute.snapshot.routeConfig?.path || '';
      
      if (showHeaderRoutes.includes(routePath)) {
        return true;
      }
    }
  
    return false;
  }
  

  private extractBreadcrumb(route: ActivatedRoute): string {
    let breadcrumb = '';
    while (route.firstChild) {
      route = route.firstChild;
      const routeData = route.snapshot.data;
      if (routeData && routeData['breadcrumb']) {
        breadcrumb = routeData['breadcrumb'];
      }
    }
    return breadcrumb;
  }

  role: any;
  firstLast: any;
 getLoggedInUser(){
  if (this.authService.isLoggedIn()) {
    // User is logged in
    this.authService.getUserInfo().subscribe(userInfo => {
      // Handle user info here
      console.log(userInfo);
      this.loggedInUsername = userInfo.data.firstName + ' ' + userInfo.data.lastName;
      this.firstLast = userInfo.data.firstName.charAt(0) + userInfo.data.lastName.charAt(0) ;
      
      this.role = userInfo.data.role;
    });
  } else {
    // User is not logged in
    // this.router.navigate(['/login']);
    // Swal.fire({
    //   icon: 'warning',
    //   title: "Unauthenticated",
    //   text: 'Please login to proceed.',
    //   confirmButtonText: 'OK',
      
    // });
  }

 }



}
