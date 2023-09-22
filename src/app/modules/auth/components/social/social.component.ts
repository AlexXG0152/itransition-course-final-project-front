import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { IAuthRes } from '../../interfaces/auth-res.interface';
import { DarkModeService } from 'angular-dark-mode';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private socialAuthService: SocialAuthService,
    private darkModeService: DarkModeService
  ) {}

  @Input() action?: string;

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;
  darkMode: boolean = JSON.parse(localStorage.getItem('dark-mode')!).darkMode;

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user: SocialUser) => {
      this.authService
        .loginWithGoogle({
          email: user.email,
          username: user.name,
          accessToken: user.idToken,
        })
        .subscribe((user: IAuthRes) => {
          this.storageService.saveUser(user.id);
          this.storageService.saveToken(user.token);
          this.authService.loginStatusChange(true);
          this.router.navigate(['/home']);
        });
    });
  }

  ngAfterViewInit(): void {
    this.darkMode$.subscribe((mode) => {
      this.darkMode = mode;
    });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
}
