import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { StorageService } from 'src/app/modules/auth/services/storage.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  isLoggedIn = false;
  loginStatus$?: Subscription;

  roles: string[] = [];
  showAdminBoard = false;

  categories: any[] = this.navigationService.categories;

  ngOnInit() {
    this.navigationService.getAllNavigationPoints();

    this.loginStatus$ = this.storageService.loginStatus().subscribe(() => {
      this.isLoggedIn = this.storageService.isLoggedIn();

      if (this.isLoggedIn) {
        this.userService.getUserInfo().subscribe((response) => {
          this.roles = response.roles.map((data: any) => data.value);
          this.showAdminBoard = this.roles.includes('ADMIN');
        });

        //   this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
        //   this.username = user.username;
      }
    });
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
