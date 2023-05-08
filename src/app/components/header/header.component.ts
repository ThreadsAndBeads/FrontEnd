import { Component, ViewChild, ElementRef, AfterViewInit ,Renderer2} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('navbar') navbar!: ElementRef;
  constructor(private renderer: Renderer2) {}
  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting ) {
    // Change background color of navbar
    this.renderer.setStyle(this.navbar.nativeElement, 'background-color', 'red');
  } else {
    // Change background color of navbar back to default
    this.renderer.setStyle(this.navbar.nativeElement, 'background-color', 'transparent');
  }
      });
    }, {
      root: null,
      rootMargin: '-500px',
      // threshold: 0
    });

    observer.observe(this.navbar.nativeElement);
  }
}
