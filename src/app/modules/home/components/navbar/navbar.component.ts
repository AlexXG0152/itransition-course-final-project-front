import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { StorageService } from 'src/app/modules/auth/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private navigationService: NavigationService,
    private storageService: StorageService
  ) {}

  isLoggedIn = false;

  categories: any[] = [];

  ngOnInit() {
    this.navigationService
      .getAllNavigationPoints()
      .subscribe((i) => this.categories.push(...i));
    console.log(this.categories);

    this.isLoggedIn = this.storageService.isLoggedIn();
    // if (this.isLoggedIn) {
    //   const user = this.storageService.getUser();
    //   this.roles = user.roles;
    //   this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    //   this.username = user.username;
    // }
  }
}
