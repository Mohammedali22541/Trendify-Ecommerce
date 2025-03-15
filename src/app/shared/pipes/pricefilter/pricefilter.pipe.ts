import { Pipe, PipeTransform } from '@angular/core';
import { Iproducts } from '../../interfaces/iproducts';

@Pipe({
  name: 'pricefilter',
  pure: false, // Ensures updates when values change dynamically
})
export class PricefilterPipe implements PipeTransform {
  transform(
    products: Iproducts[],
    minPrice: number | null,
    maxPrice: number | null
  ): Iproducts[] {
    if (!products || products.length === 0) return [];

    return products.filter((product) => {
      const price = product.price;

      // If neither minPrice nor maxPrice is set, return all products
      if (minPrice == null && maxPrice == null) {
        return true;
      }

      // If only minPrice is provided
      if (minPrice != null && maxPrice == null) {
        return price >= minPrice;
      }

      // If only maxPrice is provided
      if (minPrice == null && maxPrice != null) {
        return price <= maxPrice;
      }

      // If both minPrice and maxPrice are provided
      if (minPrice != null && maxPrice != null) {
        return price >= minPrice && price <= maxPrice;
      }

      return true;
    });
  }
}
