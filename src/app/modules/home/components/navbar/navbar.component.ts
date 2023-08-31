import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { StorageService } from 'src/app/modules/auth/services/storage.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private storageService: StorageService
  ) {}

  isLoggedIn = false;
  loginStatus$?: Subscription;

  categories: any[] = this.navigationService.categories;

  ngOnInit() {
    this.navigationService.getAllNavigationPoints();

    this.loginStatus$ = this.storageService.loginStatus().subscribe(() => {
      this.isLoggedIn = this.storageService.isLoggedIn();
    });

    // if (this.isLoggedIn) {
    //   const user = this.storageService.getUser();
    //   this.roles = user.roles;
    //   this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    //   this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    //   this.username = user.username;
    // }
  }

  logout() {
    this.storageService.clean();
    this.storageService.loginStatusChange(false);
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    // this.showButton$?.unsubscribe();
    this.loginStatus$?.unsubscribe();
  }
}
