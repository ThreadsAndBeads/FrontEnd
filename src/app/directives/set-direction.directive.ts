import { Directive, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Directive({
  selector: '[appSetDirection]'
})
export class SetDirectionDirective {
  constructor(private routerOutlet: RouterOutlet , private translate:TranslateService) { }

  @HostListener('activate')
  onActivate() {
    let lang =  localStorage.getItem('language')
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    this.translate.use(lang!);
  }
}
