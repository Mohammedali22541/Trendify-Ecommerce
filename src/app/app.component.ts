import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { NavbarComponent } from './layouts/navbar/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { NgxSpinner, NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    NgxSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent implements OnInit {
  title = 'E-Commerce';
  constructor(private flowbiteService: FlowbiteService) {}
  ngOnInit(): void {
    this.flowbiteService.loadFlowbite((flowbite) => {
      // Your custom code here
      console.log('Flowbite loaded', flowbite);
    });
  }
}
