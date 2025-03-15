import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormControlName,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss',
})
export class ForgotpasswordComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  showSuccessAlert: boolean = false;
  showErrorAlert: boolean = false;
  isloding: boolean = false;
  messageVerify: string = '';
  status: string = '';

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  step: number = 1;

  verifyEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

  resetCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^\w{6}$/),
    ]),
  });

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(this.verifyEmail.value, [
      Validators.required,
      Validators.email,
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{7,}$/),
    ]),
  });

  sendVerficationCode(): void {
    let emailValue = this.verifyEmail.get('email')?.value;
    this.resetPassword.get('email')?.patchValue(emailValue);
    console.log(this.verifyEmail.value);
    if (!this.verifyEmail.valid) {
      return;
    }
    this.isloding = true;

    this.authService
      .forgotpassword(this.verifyEmail.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res.statusMsg == 'success') {
            this.showSuccessAlert = true;
            this.messageVerify = res.message;

            this.status = res.statusMsg;
            setTimeout(() => {
              this.step = 2;
              this.showSuccessAlert = false;
            }, 4000);
          }
          this.isloding = false;
        },
        error: (err) => {
          console.log(err);
          this.isloding = false;
          this.showErrorAlert = true;

          if (err.error.statusMsg == 'fail') {
            this.messageVerify = err.error.message;
            this.status = err.error.statusMsg;
          } else {
            this.messageVerify =
              'An unexpected error occurred. Please try again.';
            this.status = 'fail';
          }
        },
      });
  }

  submitResetCode(): void {
    console.log(this.resetCode.value);
    if (!this.resetCode.valid) {
      return;
    }
    this.isloding = true;

    this.authService
      .verifyResetCode(this.resetCode.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);

          if (res.status == 'Success') {
            this.showSuccessAlert = true;
            this.messageVerify = res.message;
            this.status = res.status;

            setTimeout(() => {
              this.step = 3;
              this.showSuccessAlert = false;
            }, 4000);
          }
          this.isloding = false;
        },
        error: (err) => {
          console.log(err);
          this.isloding = false;
          this.showErrorAlert = true;

          if (err?.error?.statusMsg == 'fail') {
            this.messageVerify = err.error.message;
            this.status = err.error.statusMsg;
          } else {
            this.messageVerify =
              'An unexpected error occurred. Please try again.';
            this.status = 'fail';
          }
        },
      });
  }

  changePassword(): void {
    console.log(this.resetPassword.value);
    if (!this.resetPassword.valid) {
      return;
    }
    this.isloding = true;

    this.authService
      .resetPassword(this.resetPassword.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.authService.saveuserinfo();
          this.router.navigate(['/home']);

          // if (res.status == 'Success') {
          //   this.showSuccessAlert = true;
          //   this.messageVerify = res.message;

          //   this.status = res.status;

          //   setTimeout(() => {

          //     this.router.navigate(["/home"])
          //     // this.step = 3;
          //   }, 2000);
          // }
          // this.isloding = false;
        },
        error: (err) => {
          console.log(err);
          this.isloding = false;
          this.showErrorAlert = true;

          if (err?.error?.statusMsg == 'fail') {
            this.messageVerify = err.error.message;
            this.status = err.error.statusMsg;
          } else {
            this.messageVerify =
              'An unexpected error occurred. Please try again.';
            this.status = 'fail';
          }
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
