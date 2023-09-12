import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { catchError, tap } from 'rxjs';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  @Input() action?: string;

  constructor(
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  loginWithGoogle() {
    this.authService
      .loginWithGoogle()
      .pipe(
        tap((result) => {
          console.log(result);
          // this.router.navigate(['/home']);
          this.storageService.saveUser(result);
        }),
        catchError((error) => {
          throw error;
        })
      )
      .subscribe();
  }
}

// constructor(
//   // private _renderer2: Renderer2,
//   // @Inject(DOCUMENT) private _document: Document,
//   private authService: AuthService,
//   private storageService: StorageService // private router: Router
// ) {}

// // ngAfterViewInit() {
// //   const authScript = this._renderer2.createElement('script');
// //   authScript.src = `https://accounts.google.com/gsi/client`;
// //   authScript.async = `true`;
// //   authScript.defer = `true`;
// //   this._renderer2.appendChild(this._document.body, authScript);
// // }
