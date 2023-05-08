import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './components/footer/footer.component';
import { BubbleComponent } from './components/bubble/bubble.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AnimatedSectionComponent } from './components/animated-section/animated-section.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SellercardComponent } from './components/sellercard/sellercard.component';
import { HomeComponent } from './components/home/home.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontallScrollComponent,
    RegistrationComponent,
    HomeComponent,
    SignupComponent,
    SigninComponent,
    AboutUsComponent,
    FooterComponent,
    BubbleComponent,
    HeaderComponent,
    AnimatedSectionComponent,
    HomeComponent,
    RequestResetComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
