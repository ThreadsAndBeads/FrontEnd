import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
})
export class BannerComponent implements OnInit {
  slides!: NodeListOf<HTMLDivElement>;
  dashes!: NodeListOf<HTMLLIElement>;
  bannerInfo!: NodeListOf<HTMLDivElement>;
  slideIndex: number = 0;

  ngOnInit() {
    this.slides = document.querySelectorAll('.banner-content');
    this.dashes = document.querySelectorAll('.slide-dashes li');
    this.bannerInfo = document.querySelectorAll('.banner-info');
    
    this.bannerInfo[0].style.transform = 'translateY(-50%)';
    
    setInterval(() => {
      this.MoveSlide(1);
    }, 8000);

    this.dashes.forEach((dash, i) => {
      dash.addEventListener('click', () => {
        this.slideIndex = i;
        this.MoveSlide(0);
      });
    });
  }

  MoveSlide(n: any) {
    this.slideIndex += n;
    if (this.slideIndex >= this.slides.length) this.slideIndex = 0;
    if (this.slideIndex < 0) this.slideIndex = this.slides.length - 1;
    for (let i = 0; i < this.slides.length; i++) {
      this.slides[i].style.transform = `translateX(${
        -this.slideIndex * 100
      }%)`;
      this.bannerInfo[i].style.transform = 'translateY(-95%)';
      if (this.dashes[i].classList.contains('active')) {
        this.dashes[i].classList.remove('active');
      }
    }

    this.dashes[this.slideIndex].classList.add('active');
    this.bannerInfo[this.slideIndex].style.transform = 'translateY(-50%)';
  }
}
