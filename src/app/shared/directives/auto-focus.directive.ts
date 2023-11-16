import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[autoFocus]',
  standalone: true
})
export class AutoFocusDirective implements AfterViewInit{
  @Input() _autoFocus: boolean;
  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    if (this._autoFocus) this.el.nativeElement?.focus();
  }
}
