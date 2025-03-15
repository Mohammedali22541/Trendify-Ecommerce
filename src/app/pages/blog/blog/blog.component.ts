import { Component } from '@angular/core';
import { NewsComponent } from '../../../shared/components/ui/news/news/news.component';

@Component({
  selector: 'app-blog',
  imports: [NewsComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {}
