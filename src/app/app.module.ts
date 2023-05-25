import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/registration-page/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { HeaderComponent } from './components/navbar/header/header.component';
import { SigninComponent } from './components/registration-page/signin/signin.component';
import { RegistrationComponent } from './components/registration-page/registration/registration.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HorizontallScrollComponent } from './components/home-page/horizontall-scroll/horizontall-scroll.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SellercardComponent } from './components/sellers-page/sellercard/sellercard.component';
import { HomeComponent } from './components/home-page/home/home.component';
import { RequestResetComponent } from './components/forget-password-page/request-reset/request-reset.component';
import { UserProfileComponent } from './components/profile/user-profile/user-profile.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AddNewProductComponent } from './components/create-product/add-new-product.component';
import { ErrorComponent } from './error/error.component';
import { DragDirective } from './directives/drag.directive';
import { ResponseResetPasswordComponent } from './components/forget-password-page/response-reset-password/response-reset-password.component';
import { ProductCardComponent } from './components/products-page/product-card/product-card.component';
import { TopSellingProductsComponent } from './components/home-page/top-selling-products/top-selling-products.component';
import { BannerComponent } from './components/home-page/banner/banner.component';
import { SellersSectionComponent } from './components/home-page/sellers-section/sellers-section.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SidebarComponent } from './components/navbar/sidebar/sidebar.component';
import { ProductsPageComponent } from './components/products-page/products/products-page.component';
import { WorkshopHomeSectionComponent } from './components/home-page/workshop-home-section/workshop-home-section.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { CartProductsComponent } from './components/cart-page/cart-products/cart-products.component';
import { EmptyCartComponent } from './components/cart-page/empty-cart/empty-cart.component';
import { WorkshopCardComponent } from './components/workshop-page/workshop-card/workshop-card.component';
import { WorkshopPageComponent } from './components/workshop-page/workshop-page/workshop-page.component';
import { SellersComponent } from './components/sellers-page/sellers/sellers.component';
import {
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  GoogleSigninButtonModule,
  SocialLoginModule,
  FacebookLoginProvider,
} from '@abacritt/angularx-social-login';
import { LoadingInterceptor } from './helpers/loading.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CacheInterceptor } from './helpers/cache.interceptor';
import { CartComponent } from './components/cart-page/cart/cart.component';
import { SellerProductsComponent } from './components/seller-products-page/seller-products/seller-products.component';
import { SellerProductCardComponent } from './components/seller-products-page/seller-product-card/seller-product-card.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { GoToLoginComponent } from './components/go-to-login/go-to-login.component';
import { SearchBarComponent } from './components/navbar/search-bar/search-bar.component';
import { MyworkshopComponent } from './components/seller-workshop-page/myworkshop/myworkshop.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SellerworkshopsComponent } from './components/seller-workshop-page/sellerworkshops/sellerworkshops.component';
import { SuccessModalComponent } from './components/forget-password-page/success-modal/success-modal.component';
import { SellerOrdersComponent } from './components/seller-orders-page/seller-orders/seller-orders.component';
import { SellerOrderCardComponent } from './components/seller-orders-page/seller-order-card/seller-order-card.component';
import { FilterComponent } from './components/products-page/filter/filter.component';
import { SetDirectionDirective } from './directives/set-direction.directive';
import { CreateWorkshopComponent } from './components/create-workshop/create-workshop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { StripeComponent } from './components/stripe/stripe.component';
import { Top2sellersComponent } from './components/home-page/top2sellers/top2sellers.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditWorkshopComponent } from './components/edit-workshop/edit-workshop.component';
import { ClientOrdersComponent } from './components/client-orders/client-orders.component';
import { FavouriteComponent } from './components/favorite-page/favourite/favourite.component';
import { FavouriteProductsComponent } from './components/favorite-page/favourite-products/favourite-products.component';
import { ProductDetailsComponent } from './components/products-page/product-details/product-details.component';
import { NotificationComponent } from './components/navbar/notification/notification.component';
import { EmptyFavouritesComponent } from './components/favorite-page/empty-favourites/empty-favourites.component';
import { AnimatedNumberComponent } from './components/profile/animated-number/animated-number.component';
import { TimeAgoPipe } from './pipes/time-ago.pipe';

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
    HeaderComponent,
    LandingPageComponent,
    RequestResetComponent,
    ErrorComponent,
    HomeComponent,
    RequestResetComponent,
    AddNewProductComponent,
    UserProfileComponent,
    SellercardComponent,
    BannerComponent,
    DragDirective,
    ResponseResetPasswordComponent,
    ProductCardComponent,
    TopSellingProductsComponent,
    SellersSectionComponent,
    SidebarComponent,
    ProductsPageComponent,
    ContactUsComponent,
    WorkshopHomeSectionComponent,
    SpinnerComponent,
    CartProductsComponent,
    EmptyCartComponent,
    SellersComponent,
    ProductCardComponent,
    CartComponent,
    SellerProductsComponent,
    SellerProductCardComponent,
    EditProfileComponent,
    GoToLoginComponent,
    SearchBarComponent,
    MyworkshopComponent,
    CheckoutComponent,
    SellerworkshopsComponent,
    WorkshopCardComponent,
    SuccessModalComponent,
    SpinnerComponent,
    SetDirectionDirective,
    CreateWorkshopComponent,
    SellerOrdersComponent,
    SellerOrderCardComponent,
    FilterComponent,
    SetDirectionDirective,
    WorkshopPageComponent,
    StripeComponent,
    Top2sellersComponent,
    EditProductComponent,
    EditWorkshopComponent,
    ClientOrdersComponent,
    FavouriteComponent,
    FavouriteProductsComponent,
    ProductDetailsComponent,
    NotificationComponent,
    AnimatedNumberComponent,
    EmptyFavouritesComponent,
    AnimatedNumberComponent,
    TimeAgoPipe,
  ],
  imports: [
    AppRoutingModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    NgbModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    DragDropModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '748389809881-itoacndij8kntn22ovrorg263d3nlujp.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1716037775480430'),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
