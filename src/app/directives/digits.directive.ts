// import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { Directive, ElementRef, Input, OnChanges, AfterViewInit, Renderer2, SimpleChanges } from '@angular/core';
@Directive({
  selector: '[appDigits]',
  standalone: true
})
export class DigitsDirective implements OnChanges, AfterViewInit {
  @Input('appDigits') value: any;
  constructor(private e1: ElementRef, private renderer: Renderer2) {
    // console.log(this.elementRef.nativeElement.innerText == '.00');
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      console.log('Value changed:', changes['value'].currentValue);
      this.formatValue();
    }
  }
  ngAfterViewInit(): void {
    // console.log('AfterViewInit called');
    this.formatValue();
  }
  private formatValue(): void {
    // const formattedValue = this.formatDigits(this.value);
    // this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', formattedValue);
    const value = this.e1.nativeElement.innerText.trim();
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      const formattedValue = numericValue.toFixed(2);
      this.renderer.setProperty(this.e1.nativeElement, 'innerText', formattedValue);
    } else {
      // console.warn('Invalid numeric value for appAppendDecimal directive:', value);
    }
  }

  // private formatDigits(value: any): string {
  //   if (value === null || value === undefined) return '';
  //   return parseFloat(value).toLocaleString('en-US', {
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2
  //   });
  // }
  // ngAfterViewInit() {
  //   debugger;
  //   const value = this.elementRef.nativeElement.innerText.trim();
  //   const numericValue = parseFloat(value);
  //   if (!isNaN(numericValue)) {
  //     const formattedValue = numericValue.toFixed(2);
  //     this.renderer.setProperty(this.elementRef.nativeElement, 'innerText', formattedValue);
  //   } else {
  //     console.warn('Invalid numeric value for appAppendDecimal directive:', value);
  //   }
  // }
}
