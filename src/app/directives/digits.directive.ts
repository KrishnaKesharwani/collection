import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDigits]',
  standalone: true
})
export class DigitsDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    // console.log(this.elementRef.nativeElement.innerText == '.00');
  }

  ngAfterViewInit() {
    const value = this.elementRef.nativeElement.innerText.trim();
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toFixed(2);
      this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', formattedValue);
    } else {
      console.warn('Invalid numeric value for appAppendDecimal directive:', value);
    }
  }

}
