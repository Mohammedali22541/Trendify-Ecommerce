import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  QueryList,
  Signal,
  signal,
  ViewChild,
  ViewChildren,
  WritableSignal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  cartProductNumber: Signal<number> = computed(() =>
    this.cartService.cartNumber()
  );

  wishListNum: Signal<number> = computed(() =>
    this.wishlistService.wishListNumber()
  );

  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);

  readonly authService = inject(AuthService);

  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  // this.cartProductNumber.set(this.cartService.cartNumber());

  ngOnInit(): void {
    this.cartService.getUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });

    this.wishlistService.getUserWishlist().subscribe({
      next: (res) => {
        this.wishlistService.wishListNumber.set(res.data.length);
      },
    });
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  @ViewChild('nav') nav!: ElementRef;
  @ViewChildren('navLi') navLi!: QueryList<ElementRef>;
  @ViewChildren('navicon') navicon!: QueryList<ElementRef>;

  @HostListener('window:scroll', ['$event']) onScroll(e: any) {
    if (window.scrollY > 0) {
      this.nav.nativeElement.classList.replace('bg-transparent', 'bg-white');
      this.navLi.forEach((li) => {
        li.nativeElement.classList.replace('text-white', 'text-black');

        // li.nativeElement.classList.replace('text-white', 'text-Secondtext');
      });

      this.navicon.forEach((icon) => {
        icon.nativeElement.classList.replace('text-white', 'text-Secondtext');
      });
    } else {
      this.nav.nativeElement.classList.replace('bg-white', 'bg-transparent');

      // this.navLi.forEach((li) => {
      //   li.nativeElement.classList.replace('text-Secondtext', 'text-white');
      // });

      this.navicon.forEach((icon) => {
        icon.nativeElement.classList.replace('text-Secondtext', 'text-white');
      });
    }
  }
}
