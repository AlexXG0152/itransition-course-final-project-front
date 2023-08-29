import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { IAuthRes } from '../../interfaces/auth-res.interface';

class CustomValidators {
  static passwordContainsNumber(control: AbstractControl) {
    const regex = /\d/;
    if (regex.test(control.value) && control.value !== null) {
      return null;
    } else {
      return { passwordInvalid: true };
    }
  }
  static passwordMatch(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (
      password === confirmPassword &&
      password !== null &&
      confirmPassword !== null
    ) {
      return null;
    } else {
      return { passwordsNotMatching: true };
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  registerForm!: FormGroup;

  signup() {
    if (this.registerForm.invalid) {
      return;
    }

    this.authService
      .registration(this.registerForm.value)
      .subscribe((data: IAuthRes) => {
        this.storageService.saveUser(data.name);
        this.storageService.saveToken(data.token);
        this.storageService.loginStatusChange(true);
        this.router.navigate(['/home']);
      });
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        name: [null, [Validators.required]],
        email: [null, [Validators.required]],
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(3),
            CustomValidators.passwordContainsNumber,
          ],
        ],
        confirmPassword: [null, [Validators.required]],
        confirmTerms: [null, [Validators.requiredTrue]],
      },
      {
        validators: CustomValidators.passwordMatch,
      }
    );
  }

  agreeWithTerms() {
    return this.registerForm.patchValue({ confirmTerms: true });
  }
}
