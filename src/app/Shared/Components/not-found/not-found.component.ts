import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent {

  constructor(private route: Router) {
    
  }
  @Input()
  visible = false;
  @Input()
  notFoundMessage = 'Oops! Nothing Found';
  @Input()
  resetLinkText = 'Back To Home';
  @Input()
  resetLink = ' ';

  @Input()
  noButton: boolean = true;

  backHome() {
    this.route.navigate(['/']);
    window.scrollTo(0, 0);
  }
}
