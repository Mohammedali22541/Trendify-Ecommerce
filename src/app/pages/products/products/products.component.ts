import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { Icategory } from '../../../shared/interfaces/icategory';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';
import { Iproducts } from '../../../shared/interfaces/iproducts';
import { CardComponent } from '../../../shared/components/business/card/card/card.component';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { PricefilterPipe } from '../../../shared/pipes/pricefilter/pricefilter.pipe';

@Component({
  selector: 'app-products',
  imports: [CardComponent, FormsModule, PricefilterPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  showCategoryFilter: boolean = true;
  showPriceFilter: boolean = false;
  selectedCategoryId: string | null = null;
  minPrice: number | null = null; // Default to null
  maxPrice: number | null = null; // Default to null

  private readonly categoriesService = inject(CategoriesService);
  private readonly productsService = inject(ProductsService);
  categoryProducts: Iproducts[] = [];

  ngOnInit(): void {
    this.getCategoriesData();
    this.getCategoryproducts('6439d5b90049ad0b52b90048');
  }

  allcategoriesData: Icategory[] = [];

  getCategoriesData(): void {
    this.categoriesService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.allcategoriesData = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getCategoryproducts(id: string): void {
    this.selectedCategoryId = id;

    this.productsService
      .getCategoryproducts(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.categoryProducts = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  toggleCategory(): void {
    this.showCategoryFilter = !this.showCategoryFilter;
  }

  togglePrice(): void {
    this.showPriceFilter = !this.showPriceFilter;
  }

  resetPriceFilter(): void {
    this.minPrice = null;
    this.maxPrice = null;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
