import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './components/footer/footer.component';
import { BubbleComponent } from './components/bubble/bubble.component';
import { SignupComponent } from './components/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AnimatedSectionComponent } from './components/animated-section/animated-section.component';
import { HorizontallScrollComponent } from './components/horizontall-scroll/horizontall-scroll.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SellercardComponent } from './components/sellercard/sellercard.component';
import { HomeComponent } from './components/home/home.component';
import { RequestResetComponent } from './components/request-reset/request-reset.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AddNewProductComponent } from './components/add-new-product/add-new-product.component';
import { ErrorComponent } from './error/error.component';
import { DragDirective } from './directives/drag.directive';
import { ResponseResetPasswordComponent } from './components/response-reset-password/response-reset-password.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { TopSellComponent } from './components/top-sell/top-sell.component';
import { BannerComponent } from './components/banner/banner.component';
import { SellersSectionComponent } from './components/sellers-section/sellers-section.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';
import { WorkshopHomeSectionComponent } from './components/workshop-home-section/workshop-home-section.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
// import { LoadingInterceptor } from './helpers/loading.interceptor';
import { CartProductsComponent } from './components/cart-products/cart-products.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { WorkshopCardComponent } from './components/workshop-card/workshop-card.component';
import { WorkshopHeaderComponent } from './components/workshop-header/workshop-header.component';
import { WorkshopPageComponent } from './pages/workshop-page/workshop-page.component';
import { SellersComponent } from './pages/sellers/sellers.component';
import { GoogleLoginProvider, SocialAuthServiceConfig ,GoogleSigninButtonModule, SocialLoginModule, FacebookLoginProvider} from '@abacritt/angularx-social-login';
import { LoadingInterceptor } from './helpers/loading.interceptor';



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
    TopSellComponent,
    SellersSectionComponent,
    SidebarComponent,
    ProductsPageComponent,
    ContactUsComponent,
    WorkshopHomeSectionComponent,
    SpinnerComponent,
    // ModalComponent,
    CartProductsComponent,
    EmptyCartComponent,
    SellersComponent,
    WorkshopCardComponent,
    WorkshopHeaderComponent,
    WorkshopPageComponent,
    CartProductsComponent,
    EmptyCartComponent,
    SellersComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GoogleSigninButtonModule,
    SocialLoginModule,
    NgbModule
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
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('5ecaf9db82de67083314ed77a4a64ef9')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
