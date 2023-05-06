import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


import { FooterComponent } from './components/footer/footer.component';
import { BubbleComponent } from './components/bubble/bubble.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { AnimatedSectionComponent } from './components/animated-section/animated-section.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontallScrollComponent,
    AboutUsComponent
    SignupComponent,
    FooterComponent,
    BubbleComponent,
    HeaderComponent,
    AnimatedSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
