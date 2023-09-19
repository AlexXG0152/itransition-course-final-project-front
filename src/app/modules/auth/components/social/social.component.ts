import { Component, Input } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { catchError, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
})
export class SocialComponent {
  @Input() action?: string;

  linkToGoogle = environment.GOOGLE_LOGIN_LINK;
  linkToFacebook = environment.FACEBOOK_LOGIN_LINK;
}
