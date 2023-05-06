import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';
import { AppComponent } from './app.component';



const routes: Routes = [
  {'path': '/', component: AppComponent},
  {'path': 'auth', component: AuthenticationComponent},
  {'path':'about', component: AboutUsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }