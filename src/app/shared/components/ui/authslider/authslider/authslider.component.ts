import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-authslider',
  imports: [CarouselModule],
  templateUrl: './authslider.component.html',
  styleUrl: './authslider.component.scss',
})
export class AuthsliderComponent {
  registerOption: OwlOptions = {
    items: 4,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 500,
    autoWidth: false,
    navText: [''],
    responsive: {
      0: { items: 1 },
      600: { items: 1 },
      1024: { items: 1 },
    },

    nav: true,
  };
}
