import { Component } from '@angular/core';
import { CommonComponentService } from '../common-component.service';

@Component({
  selector: 'app-page-loader',
  templateUrl: './page-loader.component.html',
  styleUrls: ['./page-loader.component.scss']
})
export class PageLoaderComponent {
  constructor(private dropdownService: CommonComponentService) { }
  diameter: any = 24;

}
