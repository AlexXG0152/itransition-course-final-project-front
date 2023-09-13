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
    public userService: UserService
  ) {}

  isLoggedIn = false;
  loginStatus$?: Subscription;

  categories: any[] = this.navigationService.categories;

  ngOnInit() {
    this.navigationService.getAllNavigationPoints();

    this.loginStatus$ = this.storageService.loginStatus().subscribe(() => {
      this.isLoggedIn = this.storageService.isLoggedIn();
      if (this.isLoggedIn) {
        this.userService.getMyInfo();
        console.log(this.categories);

      }
    });
  }

  logout() {
    this.storageService.clean();
    this.storageService.loginStatusChange(false);
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.loginStatus$?.unsubscribe();
  }

  openPage(orderBy: string, direction: string) {
    const dbQueryParams = {
      quantity: 10,
      offset: 0,
      orderBy,
      direction,
    };

    this.router.navigate(
      [`/review/${orderBy === 'createdAt' ? 'latest' : 'popular'}`],
      { queryParams: dbQueryParams }
    );
  }
}
