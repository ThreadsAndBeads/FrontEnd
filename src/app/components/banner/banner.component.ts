import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  slides!: NodeListOf<HTMLDivElement>;
  dashes!: NodeListOf<HTMLLIElement>;
  slideIndex: number = 0;

  ngOnInit() {
    this.slides = document.querySelectorAll('.banner-content');
    this.dashes = document.querySelectorAll('.slide-dashes li');

    setInterval(() => {
      this.MoveSlide(1);
    }, 5000);

    this.dashes.forEach((dash, i) => {
      dash.addEventListener('click', () => {
        this.slideIndex = i;
        this.MoveSlide(0);
      });
    });
  }

  MoveSlide(n: any) {
    const slides =
      document.querySelectorAll<HTMLDivElement>('div.banner-content');
    const dashes = document.querySelectorAll('.slide-dashes li');

    this.slideIndex += n;
    if (this.slideIndex >= slides.length) this.slideIndex = 0;
    if (this.slideIndex < 0) this.slideIndex = slides.length - 1;
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.transform = `translateX(${
        -this.slideIndex * 100
      }%)`;
      if (dashes[i].classList.contains('active')) {
        dashes[i].classList.remove('active');
      }
    }

    dashes[this.slideIndex].classList.add('active');
  }
}
