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
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  date = new Date();
  futureDate = new Date(this.date.getTime() + 2 * 24 * 60 * 60 * 1000);
  cartDetails: IcardDetails = {} as IcardDetails;
  disableButton: boolean = false;
  showImageEmpty: boolean = true;
  @ViewChild('popupModal') popupModal!: ElementRef;

  ngOnInit(): void {
    this.getUserCart();
  }

  private readonly cartService = inject(CartService);
  getUserCart(): void {
    this.cartService
      .getUserCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cartDetails = res.data;
          // console.log(res);
          if (res.numOfCartItems == 0) {
            this.disableButton = true;
          }
          if (res.numOfCartItems !== 0) {
            this.showImageEmpty = false;
          }
        },
        error: (err) => {
          console.log(err.data);
        },
      });
  }

  updateCartProductQuantity(cartId: string, count: number): void {
    this.cartService
      .updateCartProductQuantity(cartId, count)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cartDetails = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  removeSpecificCartItem(cartid: string): void {
    this.cartService
      .removeSpecificCartItem(cartid)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.cartDetails = res.data;
          this.cartService.cartNumber.set(res.numOfCartItems);

          // console.log(res);
          if (res.numOfCartItems == 0) {
            this.showImageEmpty = true;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  clearUserCart(): void {
    this.cartService
      .clearUserCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // console.log(res);

          if (res.message == 'success') {
            this.cartService.cartNumber.set(0);

            this.cartDetails = {} as IcardDetails;
            this.closeModal();
            this.disableButton = true;
            this.showImageEmpty = true;
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
    (e.target as HTMLElement).classList.replace('flex', 'hidden');
    e.stopPropagation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
