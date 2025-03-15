import { Component, inject, Inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { AuthsliderComponent } from '../../../shared/components/ui/authslider/authslider/authslider.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    CarouselModule,
    AuthsliderComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoding: boolean = false;
  messageError: string = '';
  isSuccess: string = '';

  loginForm: FormGroup = new FormGroup(
    {
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    },

    { updateOn: 'submit' }
  );

  sendLoginForm(): void {
    // console.log(this.loginForm);
    if (this.loginForm.valid) {
      this.isLoding = true;

      this.authService
        .sendLoginForm(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              //handle login done
              this.isSuccess = res.message;
              this.messageError = '';

              setTimeout(() => {
                localStorage.setItem('token', res.token);

                this.authService.saveuserinfo();

                this.router.navigate(['/home']);
              }, 500);
            }
            this.isLoding = false;
          },
          error: (err: HttpErrorResponse) => {
            this.isLoding = false;
            this.messageError = err.error.message;
            this.isSuccess = '';

            console.log(err);
            //show message to user
          },
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
