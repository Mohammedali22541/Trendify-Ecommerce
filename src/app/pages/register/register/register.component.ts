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
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    CarouselModule,
    AuthsliderComponent,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoding: boolean = false;
  messageError: string = '';
  isSuccess: string = '';

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),

        Validators.pattern(/^[A-Z]\w{7,}$/),
      ]),
      rePassword: new FormControl(null, [Validators.required]),
      terms: new FormControl(null, [Validators.requiredTrue]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    { validators: this.confirmPassword }
  );

  submitRegisterForm(): void {
    // console.log(this.registerForm);
    if (this.registerForm.valid) {
      this.isLoding = true;

      this.authService
        .sendRegisterForm(this.registerForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            if (res.message === 'success') {
              //handle registeration done
              this.isSuccess = res.message;
              this.messageError = '';

              setTimeout(() => {
                this.router.navigate(['/login']);
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
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    const password = group.get('password')?.value;
    const rePassword = group.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
    // if (password == rePassword) {
    //   return null;
    // } else {
    //   return { mismatch: true };
    // }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
