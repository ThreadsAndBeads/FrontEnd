import { Directive, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Directive({
  selector: '[appSetDirection]'
})
export class SetDirectionDirective {
  constructor(private routerOutlet: RouterOutlet) { }

  @HostListener('activate')
  onActivate() {
    const dir = localStorage.getItem('language') === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
  }
}
