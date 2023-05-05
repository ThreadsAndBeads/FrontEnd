import { Component ,OnInit } from '@angular/core';

@Component({
  selector: 'app-bubble',
  templateUrl: './bubble.component.html',
  styleUrls: ['./bubble.component.css']
})
export class BubbleComponent implements OnInit{
  ngOnInit(): void {
    const bubbleSizeAnimation = `
    @keyframes bubble-size {
      0%, 75% {
        width: var(--size);
        height: var(--size);
      }
      
      100% {
        width: 0;
        height: 0;
      }
    }
  `;

  // Define the bubble-move animation
  const bubbleMoveAnimation = `
    @keyframes bubble-move {
      0% {
        bottom: -4rem;
      }

      100% {
        bottom: var(--distance);
      }
    }
  `;

  const style = document.createElement('style');
  style.innerHTML = bubbleSizeAnimation + bubbleMoveAnimation;
  document.head.appendChild(style);
    for (let i = 0; i < 120; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      bubble.style.position = 'absolute';
      bubble.style.width = 'var(--size)';
      bubble.style.height = 'var(--size)';
      bubble.style.left = 'var(--position)';
      bubble.style.bottom = 'var(--distance)';
      bubble.style.background = 'var(--footer-background)';
      bubble.style.borderRadius = '100%';
      bubble.style.animation = 'bubble-size var(--time) ease-in infinite var(--delay), bubble-move var(--time) ease-in infinite var(--delay)';
      bubble.style.transform = 'translate(-50%, 100%)';
      bubble.style.setProperty('--size', 2 + Math.random() * 4 + 'rem');
      bubble.style.setProperty('--distance', 3 + Math.random() * 4 + 'rem');
      bubble.style.setProperty('--position', -20 + Math.random() * 100 + '%');
      bubble.style.setProperty('--time', 2 + Math.random() * 2 + 's');
      bubble.style.setProperty('--delay', -1 * (2 + Math.random() * 2) + 's');
      document.querySelector('.bubbles')?.appendChild(bubble);
    }
  }

}
