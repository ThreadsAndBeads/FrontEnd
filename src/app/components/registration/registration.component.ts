import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const signIn = document.getElementById('signInButton') as HTMLButtonElement;
    const signUp = document.getElementById('signUpButton') as HTMLButtonElement;
    const signInForm = document.querySelector(
      '.sign-in-form'
    ) as HTMLDivElement;
    const signUpForm = document.querySelector(
      '.sign-up-form'
    ) as HTMLDivElement;
    const overlay_container = document.querySelector(
      '.overlay-container'
    ) as HTMLDivElement;
    const overlay = document.querySelector('.overlay') as HTMLDivElement;

    signIn.addEventListener('click', () => {
      overlay_container.style.transform = 'translateX(100%)';
      overlay.style.transform = 'translateX(-50%)';
      signInForm.classList.add('active');
      signUpForm.classList.remove('active');
    });

    signUp.addEventListener('click', () => {
      overlay_container.style.transform = 'translateX(0)';
      overlay.style.transform = 'translateX(0)';
      signUpForm.classList.add('active');
      signInForm.classList.remove('active');
    });
  }
}
