import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';
import { AppComponent } from './app.component';
import { AnimatedSectionComponent } from './components/animated-section/animated-section.component';
import { HomeComponent } from './components/home/home.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { ResponseResetPasswordComponent } from './components/response-reset-password/response-reset-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ErrorComponent } from './error/error.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { SellersComponent } from './pages/sellers/sellers.component';

import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { WorkshopCardComponent } from './components/workshop-card/workshop-card.component';
import { WorkshopPageComponent } from './pages/workshop-page/workshop-page.component';

const routes: Routes = [
  { path: '', component: AnimatedSectionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: RegistrationComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  {
    path: 'forgetPassword',
    component: RequestResetComponent,
  },
  { path: 'addNewProduct', component: AddNewProductComponent },
  {
    path: 'response-reset-password/:token',
    component: ResponseResetPasswordComponent,
  },
  { path: 'profile', component: UserProfileComponent },
  { path: 'products', component: ProductsPageComponent },
  {path : 'workshops' , component:WorkshopPageComponent},
  { path: 'sellers', component: SellersComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
