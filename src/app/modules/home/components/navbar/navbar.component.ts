import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/user/services/user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { StorageService } from 'src/app/modules/auth/services/storage.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private navigationService: NavigationService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private storageService: StorageService,
    public userService: UserService,
  ) {}

  isLoggedIn = false;
  loginStatus$?: Subscription;

  categories: any[] = this.navigationService.categories;

  ngOnInit() {
    this.navigationService.getAllNavigationPoints();

    this.loginStatus$ = this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = this.authService.isLoggedIn();
      if (this.isLoggedIn) {
        this.userService.getMyInfo();
      }
    });
  }

  logout() {
    this.storageService.clean();
    this.authService.loginStatusChange(false);
    this.userService.setAdminBoard(false);
    this.socialAuthService.signOut();
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.loginStatus$?.unsubscribe();
  }

  openPage(orderBy: string, direction: string, categoryId?: number) {
    const dbQueryParams = {
      quantity: 10,
      offset: 0,
      orderBy,
      direction,
      categoryId,
    };

    if (categoryId !== undefined) {
      this.router.navigate([`/review/list`], { queryParams: dbQueryParams });
      return;
    }

    this.router.navigate(
      [`/review/${orderBy === 'createdAt' ? 'latest' : 'popular'}`],
      { queryParams: dbQueryParams }
    );
  }
}
