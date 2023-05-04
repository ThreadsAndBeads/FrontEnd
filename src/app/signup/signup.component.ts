import { Component, OnInit } from '@angular/core';
declare const signIn: any;
declare const signUp: any;
declare const signInForm: any;
declare const signUpForm: any;
declare const overlay_container: any;
declare const overlay: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    signIn.addEventListener("click", () => {
      overlay_container.style.transform = "translateX(100%)";
      overlay.style.transform = "translateX(-50%)";
      signInForm.classList.add("active");
      signUpForm.classList.remove("active");
    });

    signUp.addEventListener("click", () => {
      overlay_container.style.transform = "translateX(0)";
      overlay.style.transform = "translateX(0)";
      signUpForm.classList.add("active");
      signInForm.classList.remove("active");
    });
  }
}