import { Component } from '@angular/core';
import { NewsComponent } from '../../../shared/components/ui/news/news/news.component';

@Component({
  selector: 'app-contact-us',
  imports: [NewsComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
})
export class ContactUsComponent {}
