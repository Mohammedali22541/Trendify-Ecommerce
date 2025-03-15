import { CartService } from './../../../core/services/cart/cart.service';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Icategory } from '../../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../core/services/products/products.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { SpecificService } from '../../../core/services/specific/specific.service';
import { SpecificategorydataW } from '../../../shared/interfaces/specificategorydata-w';

import { CurrencyPipe } from '@angular/common';
import { CardComponent } from '../../../shared/components/business/card/card/card.component';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, CardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly specificService = inject(SpecificService);
  private readonly cartService = inject(CartService);
  categoryProducts: Iproducts[] = [];

  allCategoryData: Icategory[] = [];
  allProductData: Iproducts[] = [];
  pageTwoProduct: Iproducts[] = [];
  // dataWomans: SpecificategorydataW[] = [];
  // dataMans: SpecificategorydataW[] = [];
  // dataELC: SpecificategorydataW[] = [];

  ngOnInit(): void {
    this.getCatergoryData();
    this.getProductData();
    this.getProductDataPageTwo();
    this.getCategoryproducts('6439d5b90049ad0b52b90048');

    // this.getSpecficCategoryDataW();
    // this.getSpecficCategoryDataM();
    // this.getSpecficCategoryDataELC();
    this.getUserCart();
  }

  getCatergoryData(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.allCategoryData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getCategoryproducts(id: string): void {
    this.productsService
      .getCategoryproducts(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          // console.log(res.data);
          this.categoryProducts = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getProductData(): void {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.allProductData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  getProductDataPageTwo(): void {
    this.productsService
      .getPageTwoProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.pageTwoProduct = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // getSpecficCategoryDataW(): void {
  //   this.specificService.getspicificProductCategoryW().subscribe({
  //     next: (res) => {
  //       this.dataWomans = res.data;
  //     },
  //     error: (err) => {
  //       console.log(err.data);
  //     },
  //   });
  // }

  // getSpecficCategoryDataM(): void {
  //   this.specificService.getspicificProductCategoryM().subscribe({
  //     next: (res) => {
  //       this.dataMans = res.data;
  //     },
  //     error: (err) => {
  //       console.log(err.data);
  //     },
  //   });
  // }

  // getSpecficCategoryDataELC(): void {
  //   this.specificService.getspicificProductCategoryELC().subscribe({
  //     next: (res) => {
  //       this.dataELC = res.data;
  //     },
  //     error: (err) => {
  //       console.log(err.data);
  //     },
  //   });
  // }

  // addToCart(id: string): void {
  //   this.cartService.addProductToCart(id).subscribe({
  //     next: (res) => {
  //       console.log(res);

  //       this.toastrService.success('product Added Sucsessfully', 'Cart');
  //     },
  //     error: (err) => {
  //       console.log(err);
  //     },
  //   });
  // }

  getUserCart(): void {
    this.cartService
      .getUserCart()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {},
        error: (err) => {
          console.log(err);
        },
      });
  }

  customOptions: OwlOptions = {
    autoWidth: false,

    loop: true,
    items: 6,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 10,
    navText: [
      '<span class=""><i class="fa-solid fa-chevron-left"></i></span>',
      '<span class=""><i class="fa-solid fa-chevron-right  "></i></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 3,
      },
      740: {
        items: 6,
      },
      940: {
        items: 8,
      },
    },
    nav: true,
  };
  ratingslide: OwlOptions = {
    items: 3,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    autoWidth: false,
    navText: [
      '<span class=""><i class="fa-solid fa-chevron-left"></i></span>',
      '<span class=""><i class="fa-solid fa-chevron-right  "></i></span>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },

    nav: true,
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
