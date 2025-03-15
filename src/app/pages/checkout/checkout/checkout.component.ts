import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CartService } from '../../../core/services/cart/cart.service';
import { IcardDetails } from '../../../shared/interfaces/icard-details';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { AddressformComponent } from '../../../shared/components/business/addressform/addressform/addressform.component';
import { AddressService } from '../../../core/services/address/address.service';
import { Iuseraddress } from '../../../shared/interfaces/iuseraddress';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { OrderService } from '../../../core/services/order/order.service';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-checkout',
  imports: [CurrencyPipe, DatePipe, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  date = new Date();
  futureDate = new Date(this.date.getTime() + 2 * 24 * 60 * 60 * 1000);
  cartDetails: IcardDetails = {} as IcardDetails;
  useraddress: Iuseraddress[] = [];
  @ViewChild('popupModal') popupModal!: ElementRef;
  @ViewChild('credit') credit!: ElementRef;
  @ViewChild('cash') cash!: ElementRef;

  private readonly cartService = inject(CartService);
  private readonly addressService = inject(AddressService);
  private readonly toastrService = inject(ToastrService);
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);
  checkedAddress: boolean = true;

  @ViewChild(AddressformComponent) AddressformComponent!: AddressformComponent;

  ngOnInit(): void {
    this.getUserCart();
    this.getUserAddress();
  }

  address: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    details: new FormControl(null, [Validators.required]),
    city: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    addressType: new FormControl(null, [Validators.required]),
  });

  getUserCart(): void {
    this.cartService
      .getUserCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cartDetails = res.data;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  submitAddressForm(): void {
    console.log(this.address);
    if (this.address.valid) {
      this.addressService
        .addAddress(this.address.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.useraddress = res.data;

            if (res.message == 'Address added successfully') {
              this.closeModal();
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  getUserAddress(): void {
    this.addressService
      .getUserAddress()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.useraddress = res.data;
          console.log(res.data);
          if (res.data.length > 1) {
            this.checkedAddress = false;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  submitForm(): void {
    if (this.credit.nativeElement.checked) {
      this.orderService
        .checkoutSession(
          this.cartDetails._id,
          this.useraddress[0].details,
          this.useraddress[0].phone,
          this.useraddress[0].city
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              open(res.session.url, '_self');
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
    } else if (this.cash.nativeElement.checked) {
      this.orderService
        .createCashOrder(
          this.cartDetails._id,
          this.useraddress[0].details,
          this.useraddress[0].phone,
          this.useraddress[0].city
        )
        .subscribe({
          next: (res) => {
            console.log(res);
            if (res.status == 'success') {
              this.router.navigate(['/allorders']);
            }
          },
          error: (err) => {
            console.log(err);
            console.log(this.address.value);
          },
        });
    }
  }

  // payForOrder(cartId: string, data: {}) {
  //   console.log(this.credit.nativeElement.checked);
  //   console.log(this.cash.nativeElement.checked);

  //   if (this.credit.nativeElement.checked) {
  //     this.orderService.checkoutSession(cartId, data).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //         console.log(cartId);
  //         console.log(data);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //         console.log(cartId);
  //         console.log(data);
  //       },
  //     });
  //   } else if (this.cash.nativeElement.checked) {
  //     this.orderService.createCashOrder(cartId, data).subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  //   }
  // }

  removeAddress(id: string): void {
    this.addressService
      .removeAddress(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          if (res.status == 'success') {
            this.useraddress = res.data;
            this.toastrService.success(res.message, 'Address Info');
            this.toastrService.toastrConfig.progressBar = true;
            // this.toastrService.toastrConfig.toastClass = 'ngx-toastr';
            this.toastrService.toastrConfig.timeOut = 2000;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  showModal(): void {
    this.popupModal.nativeElement.classList.replace('hidden', 'flex');
  }

  closeModal(): void {
    this.popupModal.nativeElement.classList.replace('flex', 'hidden');
  }

  hideModal(e: MouseEvent): void {
    let target = e.target as HTMLElement;
    if (target.classList.contains('fixed')) {
      this.popupModal.nativeElement.classList.replace('flex', 'hidden');
    }
    e.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
