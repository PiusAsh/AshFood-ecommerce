import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {



  shouldDisplayHeader: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.shouldDisplayHeader = this.shouldDisplayHeaderOnCurrentRoute(this.route.root);
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

  logout(){
    Swal.fire({
      icon: 'question',
      title: "Logout",
      text: 'Are you sure you want to log out?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      
    }).then((result: any) =>{
      if (result.value){
        localStorage.removeItem('userId')
        localStorage.removeItem('token')
        this.router.navigate(['/login']);
      }
    } );
  }
}
