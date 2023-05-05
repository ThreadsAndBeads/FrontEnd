import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';

import { FooterComponent } from './components/footer/footer.component';
import { BubbleComponent } from './components/bubble/bubble.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    HorizontallScrollComponent,
    SignupComponent,
    FooterComponent,
    BubbleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
