import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {}
  @Input() action?: string;

  linkToGoogle = environment.GOOGLE_LOGIN_LINK;
  linkToFacebook = environment.FACEBOOK_LOGIN_LINK;

  loginWithGoogle() {
    // window.open(
    //   'http://localhost:3000/api/v1/auth/google',
    //   'mywindow',
    //   'location=1,status=1,scrollbars=1, width=600,height=650'
    // );

    // return this.http.get<any>('http://localhost:3000/api/v1/auth/google').subscribe((user) => {
    //   this.storageService.saveUser(user.id);
    //   this.storageService.saveToken(user.token);
    //   this.authService.loginStatusChange(true);
    //   this.router.navigate(['/home']);
    // });
  }
}
