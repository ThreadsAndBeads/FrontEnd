import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  {'path': '/', component: AppComponent},
  {'path':'signup', component: SignupComponent},
  {'path':'about', component: AboutUsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
