import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appDynamicWidth]'
})

export class DynamicWidthDirective {

  constructor(private el: ElementRef) { }
  @Input()

  set appDynamicWidth(val: string | number) {
    this.el.nativeElement.style.width = val + 'px';
    this.el.nativeElement.style.height = val + 'px';
  }
  
}
