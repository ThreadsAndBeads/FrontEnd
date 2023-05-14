import {AfterViewInit, Component, OnInit } from '@angular/core';
// import * as winwheelModule from 'winwheel';
import {TimelineMax, TweenMax} from 'gsap';
// import * as winwheelModule from '../../../assets/JS/Winwheel.js';

// winwheelModule.Winwheel();
declare let Winwheel:any;

@Component({
  selector: 'app-winwheel',
  templateUrl: './winwheel.component.html',
  styleUrls: ['./winwheel.component.css'],
})
export class WinwheelComponent implements OnInit, AfterViewInit {
  ngOnInit() {
    const canvas = document.getElementById('canvas');
    const winwheel = new Winwheel({
      canvasId: 'canvas',
      numSegments: 8,
      outerRadius: 200,
      innerRadius: 50,
      textFontSize: 20,
      textOrientation: 'curved',
      segments: [
        { fillStyle: '#eae56f', text: 'Prize 1' },
        { fillStyle: '#89f26e', text: 'Prize 2' },
        { fillStyle: '#7de6ef', text: 'Prize 3' },
        { fillStyle: '#e7706f', text: 'Prize 4' },
        { fillStyle: '#eae56f', text: 'Prize 5' },
        { fillStyle: '#89f26e', text: 'Prize 6' },
        { fillStyle: '#7de6ef', text: 'Prize 7' },
        { fillStyle: '#e7706f', text: 'Prize 8' },
      ],
      animation: {
        type: 'spinToStop',
        duration: 5,
        spins: 8,
        callbackFinished: this.alertPrize,
      },
    });
    winwheel.draw();
  }

  title = 'angular10-winwheelJS';
  theWheel: any;
  wheelPower = 0;
  wheelSpinning = false;
  winningSegment!: string;
  buttonImage = '/assets/images/spin_off.png';

  ngAfterViewInit(): void {
    this.theWheel = new Winwheel({
      numSegments: 8,
      outerRadius: 212,
      centerX: 217,
      centerY: 219,
      textFontSize: 28,
      segments: [
        { fillStyle: '#eae56f', text: 'Prize 1' },
        { fillStyle: '#89f26e', text: 'Prize 2' },
        { fillStyle: '#7de6ef', text: 'Prize 3' },
        { fillStyle: '#e7706f', text: 'Prize 4' },
        { fillStyle: '#eae56f', text: 'Prize 5' },
        { fillStyle: '#89f26e', text: 'Prize 6' },
        { fillStyle: '#7de6ef', text: 'Prize 7' },
        { fillStyle: '#e7706f', text: 'Prize 8' },
      ],
      animation: {
        type: 'spinToStop',
        duration: 5,
        spins: 8,
        callbackFinished: this.alertPrize.bind(this),
      },
      pointerGuide: {
        display: true,
        strokeStyle: 'red',
        lineWidth: 3,
      },
    });
  }

  powerSelected(powerLevel: any): void {
    if (this.wheelSpinning === false) {
      const pw1 = document.getElementById('pw1')!;
      const pw2 = document.getElementById('pw2')!;
      const pw3 = document.getElementById('pw3')!;
      pw1.className = '';
      pw2.className = '';
      pw3.className = '';
      if (powerLevel >= 1) {
        pw1.className = 'pw1';
      }
      if (powerLevel >= 2) {
        pw2.className = 'pw2';
      }
      if (powerLevel >= 3) {
        pw3.className = 'pw3';
      }
      this.wheelPower = powerLevel;
      this.buttonImage = '/assets/images/spin_on.png';
      document.getElementById('spin_button')!.className = 'clickable';
    }
  }

  startSpin(): void {
    if (this.wheelSpinning === false) {
      if (this.wheelPower === 1) {
        this.theWheel.animation.spins = 3;
      } else if (this.wheelPower === 2) {
        this.theWheel.animation.spins = 8;
      } else if (this.wheelPower === 3) {
        this.theWheel.animation.spins = 15;
      }
    }
    this.buttonImage = '/assets/Images/spin_off.png';
    const spinButton = document.getElementById('spin_button')!;
    spinButton.className = '';
    this.theWheel.startAnimation(new TweenMax(new TimelineMax()));
    this.wheelSpinning = true;
  }

  resetWheel(): void {
    this.theWheel.stopAnimation(false);
    this.theWheel.rotationAngle = 0;
    this.theWheel.draw();

    const pw1 = document.getElementById('pw1');
    const pw2 = document.getElementById('pw2');
    const pw3 = document.getElementById('pw3');

    if (pw1 !== null) {
      pw1.className = '';
    }

    if (pw2 !== null) {
      pw2.className = '';
    }

    if (pw3 !== null) {
      pw3.className = '';
    }

    this.wheelSpinning = false;
  }

  alertPrize(): void {
    this.winningSegment = this.theWheel.getIndicatedSegment().text;
    alert('You have won ' + this.theWheel.getIndicatedSegment().text);
  }

  getSegment(e: any): void {
    const clickedSegment = this.theWheel.getSegmentAt(e.clientX, e.clientY);
    console.log('Segment clicked - ', clickedSegment);
  }

  calculatePrize(): void {
    // This formula always makes the wheel stop somewhere inside prize 3 at least
    // 1 degree away from the start and end edges of the segment.
    const stopAt = 91 + Math.floor(Math.random() * 43);
    // const stopAt = (25 + Math.floor((Math.random() * 78)));
    console.log('Stop at angle must lie between 90 and 135 degrees - ', stopAt);
    // Important thing is to set the stopAngle of the animation before stating the spin.
    this.theWheel.animation.stopAngle = stopAt;
    // May as well start the spin from here.
    this.startSpin();
    // this.theWheel.animation.callbackFinished = console.log('This after animation ends - ', this.theWheel.getIndicatedSegment());
  }
}
