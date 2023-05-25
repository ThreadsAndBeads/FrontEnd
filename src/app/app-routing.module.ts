import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/registration-page/registration/registration.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AnimatedSectionComponent } from './components/animated-section/animated-section.component';
import { HomeComponent } from './components/home-page/home/home.component';
import { RequestResetComponent } from './components/forget-password-page/request-reset/request-reset.component';
import { AddNewProductComponent } from './components/create-product/add-new-product.component';
import { ResponseResetPasswordComponent } from './components/forget-password-page/response-reset-password/response-reset-password.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { ErrorComponent } from './error/error.component';
import { ProductsPageComponent } from './components/products-page/products/products-page.component';
import { SellersComponent } from './components/sellers-page/sellers/sellers.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { WorkshopPageComponent } from './components/workshop-page/workshop-page/workshop-page.component';
import { GoToLoginComponent } from './components/go-to-login/go-to-login.component';
import { SellerProductsComponent } from './components/seller-products-page/seller-products/seller-products.component';
import { CartComponent } from './components/cart-page/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { MyworkshopComponent } from './components/seller-workshop-page/myworkshop/myworkshop.component';
import { CreateWorkshopComponent } from './components/create-workshop/create-workshop.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { SellerOrdersComponent } from './components/seller-orders-page/seller-orders/seller-orders.component';
import { EditWorkshopComponent } from './components/edit-workshop/edit-workshop.component';
import { FavouriteComponent } from './components/favorite-page/favourite/favourite.component';
import { ProductDetailsComponent } from './components/products-page/product-details/product-details.component';
import { ClientOrdersComponent } from './components/client-orders/client-orders.component';
import { AuthGuard } from './guard/auth.guard';
import { SellerGuard } from './guard/seller.guard';
import { CustomerGuard } from './guard/customer.guard';

const routes: Routes = [
  { path: '', component: AnimatedSectionComponent },
  { path: 'home', component: HomeComponent },
  { path: 'auth', component: RegistrationComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'welcome', component: GoToLoginComponent },
  { path: 'sellers', component: SellersComponent },
  { path: 'workshops', component: WorkshopPageComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productDetails/:id',
    component: ProductDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'forgetPassword',
    component: RequestResetComponent,
  },
  {
    path: 'response-reset-password/:token',
    component: ResponseResetPasswordComponent,
  },
  {
    path: 'seller',
    canActivate: [SellerGuard],
    children: [
      { path: 'myWorkshops', component: MyworkshopComponent },
      { path: 'addNewWorkshop', component: CreateWorkshopComponent },
      { path: 'addNewProduct', component: AddNewProductComponent },
      { path: 'sellerProducts', component: SellerProductsComponent },
      { path: 'editProduct/:productId', component: EditProductComponent },
      { path: 'editWorkshop/:workshopId', component: EditWorkshopComponent },
      { path: 'orders', component: SellerOrdersComponent },
    ],
  },
  {
    path: 'customer',
    canActivate: [CustomerGuard],
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'orders', component: ClientOrdersComponent },
      { path: 'favorites', component: FavouriteComponent },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
