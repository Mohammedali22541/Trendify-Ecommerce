import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { CardComponent } from '../../../shared/components/business/card/card/card.component';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  imports: [CardComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  isLoad!: boolean;
  userWData: Iproducts[] = [];
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  ngOnInit(): void {
    this.getUserWList();
  }

  getUserWList(): void {
    this.wishlistService
      .getUserWishlist()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // console.log(res);
          this.userWData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deletProductFromWish = (prodId: string): void => {
    // this.isLoad = true;
    this.wishlistService
      .deleteProductFromWishlist(prodId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // console.log(res);

          this.wishlistService.wishListNumber.set(res.data.length);
          if (res.status == 'success') {
            this.toastrService.success(res.message, 'WishList');
            this.toastrService.toastrConfig.progressBar = true;
            this.toastrService.toastrConfig.timeOut = 2000;
            this.getUserWList();
          }
        },

        error: (err) => {
          this.isLoad = false;

          console.log(err);
        },
      });
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
