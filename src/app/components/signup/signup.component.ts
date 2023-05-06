import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  name: string = '';
  email: string = '';
  password: string = '';
  type: string = '';
  error = {
    email: '',
    password: ''
  };
  constructor(private http: HttpClient) { }

  onSignUpSubmit() {
    const userData = {
      name: this.name,
      email: this.email,
      password: this.password,
      type: this.type
    };
    this.http.post('http://localhost:7000/api/v1/users/signup', userData)
      .subscribe(response => {
        console.log(response);
      }, error => {
        this.error = error.error.errors;
      });
  }


  ngOnInit(): void {

    const signIn = document.getElementById("signInButton") as HTMLButtonElement;
    const signUp = document.getElementById("signUpButton") as HTMLButtonElement;
    const signInForm = document.querySelector(".sign-in-form") as HTMLDivElement;
    const signUpForm = document.querySelector(".sign-up-form") as HTMLDivElement;
    const overlay_container = document.querySelector(".overlay-container") as HTMLDivElement;
    const overlay = document.querySelector(".overlay") as HTMLDivElement;

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
