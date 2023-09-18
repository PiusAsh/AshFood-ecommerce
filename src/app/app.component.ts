
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AshHotel - Your Hotel Management system';

  shouldDisplayContent: boolean = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.shouldDisplayContent = this.shouldDisplayHeaderOnCurrentRoute(this.route);
    });
  }

  private shouldDisplayHeaderOnCurrentRoute(route: ActivatedRoute): boolean {
    const allowShowHeaderAndSidebar = ['dashboard', 'manage-users', 'dashboard', 'manage-reviews', 'manage-rooms',
     'manage-categories', 'manage-bookings', 'manage-users', 'role-setup', 'profile', 'report'];
  
    if (route.firstChild) {
      const childRoute = route.firstChild;
      const routePath = childRoute.snapshot.routeConfig?.path || '';
  
      // Check if the routePath matches one of the showHeaderRoutes
      if (allowShowHeaderAndSidebar.includes(routePath)) {
        return true;
      }
    }
  
    return false;
  }
  
}
