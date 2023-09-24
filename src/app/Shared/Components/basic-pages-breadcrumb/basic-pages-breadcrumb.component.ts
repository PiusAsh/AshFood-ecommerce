import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-basic-pages-breadcrumb',
  templateUrl: './basic-pages-breadcrumb.component.html',
  styleUrls: ['./basic-pages-breadcrumb.component.css']
})
export class BasicPagesBreadcrumbComponent {

  @Input()
  pageTitle = "";

  @Input()
  resetLink = " ";

  @Input()
HomeLink = "Home";
@Input()
currentPageLink = "";
@Input()
searchResult: any;


}
