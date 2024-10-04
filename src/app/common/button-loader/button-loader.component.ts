import { Component } from '@angular/core';
import { CommonComponentService } from '../common-component.service';
@Component({
  selector: 'app-button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.scss']
})
export class ButtonLoaderComponent {
  constructor(private dropdownService: CommonComponentService) { }
  diameter: any = 16;

}
