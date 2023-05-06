import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FooterComponent } from './components/footer/footer.component';
import { BubbleComponent } from './components/bubble/bubble.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AnimatedSectionComponent } from './components/animated-section/animated-section.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontallScrollComponent,
    AuthenticationComponent,
    SignupComponent,
    SigninComponent,
    FooterComponent,
    BubbleComponent,
    HeaderComponent,
    AnimatedSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
