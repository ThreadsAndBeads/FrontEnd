import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
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
import { WorkshopPageComponent } from './pages/workshop-page/workshop-page.component';
import { GoToLoginComponent } from './pages/go-to-login/go-to-login.component';
import { SellerProductsComponent } from './components/seller-products/seller-products.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyworkshopComponent } from './components/myworkshop/myworkshop.component';
import { CreateWorkshopComponent } from './components/create-workshop/create-workshop.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SellerOrdersComponent } from './pages/seller-orders/seller-orders.component';
import { EditWorkshopComponent } from './components/edit-workshop/edit-workshop.component';
import { FavouriteComponent } from './components/favourite/favourite.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
// import { StripeComponent } from './components/stripe/stripe.component';
const routes: Routes = [
  { path: '', component: AnimatedSectionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: RegistrationComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'myWorkshops', component: MyworkshopComponent },
  { path: 'addNewWorkshop', component: CreateWorkshopComponent },
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
  {path: 'productDetails/:id', component: ProductDetailsComponent},
  { path: 'workshops', component: WorkshopPageComponent },
  { path: 'sellers', component: SellersComponent },
  { path: 'sellerProducts', component: SellerProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'editProfile', component: EditProfileComponent },
  { path: 'welcome', component: GoToLoginComponent },
  { path: 'editProduct/:productId', component: EditProductComponent },
  { path: 'editWorkshop/:workshopId', component: EditWorkshopComponent },
  // {path: 'stripe', component: StripeComponent },
  { path: 'orders', component: SellerOrdersComponent },
  { path: 'favourites', component: FavouriteComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
