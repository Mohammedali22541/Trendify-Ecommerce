import { ProgressAnimationType } from './../../../../../../../node_modules/ngx-toastr/toastr/toastr-config.d';
import {
  Component,
  Input,
  OnDestroy,
  WritableSignal,
  inject,
  input,
  signal,
} from '@angular/core';
import { Iproducts } from '../../../../interfaces/iproducts';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../../../../../core/services/wishlist/wishlist.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  @Input() product: Iproducts = {} as Iproducts;
  @Input() showAddedIcon: boolean = true;
  // @Input() isloading!: boolean;
  @Input() deleteProdList!: (id: string) => void;

  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  // numberOfProducts: WritableSignal<number> = signal(0);

  addToCart(id: string, e: MouseEvent): void {
    e.stopPropagation();
    this.cartService
      .addProductToCart(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          // this.numberOfProducts.set(res.numOfCartItems);
          this.cartService.cartNumber.set(res.numOfCartItems);

          this.toastrService.success(res.message, 'cart');
          this.toastrService.toastrConfig.progressBar = true;
          // this.toastrService.toastrConfig.toastClass = 'ngx-toastr';
          this.toastrService.toastrConfig.timeOut = 2000;
        },

        error: (err) => {
          console.log(err);
          // this.isloading = false;
        },
      });
  }

  addProductToWishList(data: string): void {
    this.wishlistService
      .addToWishList(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);

          this.wishlistService.wishListNumber.set(res.data.length);

          this.toastrService.success(res.message, 'WishList');
          this.toastrService.toastrConfig.progressBar = true;
          this.toastrService.toastrConfig.timeOut = 2000;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
