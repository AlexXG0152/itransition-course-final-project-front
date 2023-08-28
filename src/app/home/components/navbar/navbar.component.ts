import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { ICategory } from '../../interfaces/icategory';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private navigationService: NavigationService) {}

  categories: any[] = this.navigationService.AllNavigationPoints;

  ngOnInit() {
    this.navigationService.getAllNavigationPoints();
    console.log(this.categories);
  }
}
