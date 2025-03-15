import { CartService } from './../../../core/services/cart/cart.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { Subject, takeUntil } from 'rxjs';
import { CardComponent } from '../../../shared/components/business/card/card/card.component';

@Component({
  selector: 'app-details',
  imports: [DatePipe, CurrencyPipe, CardComponent],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  private readonly toastrService = inject(ToastrService);

  date = new Date();
  futureDate = new Date(this.date.getTime() + 2 * 24 * 60 * 60 * 1000);
  products: Iproducts | null = null;
  specificProductDetails: Iproducts = {} as Iproducts;
  SimilarProducts: Iproducts[] = [];
  simia: Iproducts = {} as Iproducts;
  count: number = 1;

  showFullDescription: boolean = false;
  showDetailes: boolean = false;

  @ViewChild('mainImage') mainImage!: ElementRef;
  @ViewChild('thumbImg') thumbImg!: QueryList<ElementRef>;
  thumbImgSrc: string = '';
  currentIndex: number = 0;
  ngOnInit(): void {
    this.getProductId();
  }
  // ngOnChanges(): void {
  //   this.getProductsByCatgegory(this.specificProductDetails.category._id);
  // }

  getProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let productId = p.get('id');
        this.getProductDetails(productId!);
        this.getSimilarProducts();
      },
    });
  }

  getProductDetails(id: string): void {
    this.productsService
      .getSpecificProduct(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);
          this.specificProductDetails = res.data;
          this.getSimilarProducts();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  addProuductToCart(id: string): void {
    this.cartService
      .addProductToCart(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          console.log(res);

          this.cartService.cartNumber.set(res.numOfCartItems);
          this.toastrService.success(res.message, 'cart');
          this.toastrService.toastrConfig.progressBar = true;
          // this.toastrService.toastrConfig.toastClass = 'ngx-toastr';
          this.toastrService.toastrConfig.timeOut = 2000;
        },
        error: (err) => {
          console.log(err);
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
          this.toastrService.success(res.message, 'WishList');
          this.toastrService.toastrConfig.progressBar = true;
          this.toastrService.toastrConfig.timeOut = 2000;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // getProductsByCatgegory(id: string): void {
  //   this.productsService
  //     .getCategoryproducts(id)
  //     .pipe(takeUntil(this.destroy$))
  //     .subscribe({
  //       next: (res) => {
  //         console.log(res);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }

  getSimilarProducts(): void {
    const categoryId = this.specificProductDetails?.category?._id;
    if (categoryId) {
      this.productsService
        .getCategoryproducts(categoryId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res) => {
            console.log(res);
            this.SimilarProducts = res.data;
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  // updateCartProductQuantity(cartId: string, count: number): void {
  //   this.CartService.updateCartProductQuantity(cartId, count).subscribe({
  //     next: (res) => {
  //       console.log(res);
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  toggelDescription(): void {
    this.showFullDescription = !this.showFullDescription;
  }
  toggelReviews(): void {
    this.showDetailes = !this.showDetailes;
  }

  changeQuantity(num: number): void {
    let newCount = this.count + num;
    if (newCount >= 1 && newCount <= 10) {
      this.count = newCount;
    } else {
      this.count;
    }
  }

  changeImages(e: any): void {
    this.thumbImgSrc = e.target.src;
    this.mainImage.nativeElement.setAttribute('src', this.thumbImgSrc);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // nextImage(e: any) {
  //   console.log(e);

  //   // this.mainImage.nativeElement.setAttribute('src', this.thumbImgSrc);
  //   // console.log(this.thumbImgSrc);
  // }
}
