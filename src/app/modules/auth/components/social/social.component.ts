import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IAuthRes } from '../../interfaces/auth-res.interface';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  constructor(
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    const authScript = this._renderer2.createElement('script');
    authScript.src = `https://accounts.google.com/gsi/client`;
    authScript.async = `true`;
    authScript.defer = `true`;
    this._renderer2.appendChild(this._document.body, authScript);
  }

  loginWithFacebook() {
    this.authService
      .loginWithFacebook()
      .pipe(
        tap((result) => {
          console.log(result);
          // this.router.navigate(['/home']);
          this.storageService.saveUser(result);
        }),
        catchError((error) => {
          console.log(error);

          throw error;
        })
      )
      .subscribe();
    // .subscribe((data: IAuthRes) => {
    //   console.log(data);

    //   this.storageService.saveUser(data.name);
    //   this.storageService.saveToken(data.token);
    //   this.storageService.loginStatusChange(true);
    //   // this.router.navigate(['/home']);
    // });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().pipe(
      tap((result) => {
        console.log(result);
        // this.router.navigate(['/home']);
        this.storageService.saveUser(result);
      }),
      catchError((error) => {
        console.log(error);

        throw error;
      })
    )
    .subscribe();
    // .subscribe((data: any) => {
      // console.log(data);
      // this.storageService.saveUser(data);
      // this.storageService.saveToken(data.token);
      // this.storageService.loginStatusChange(true);
      // this.router.navigate(['/home']);
    // });
  }
}
