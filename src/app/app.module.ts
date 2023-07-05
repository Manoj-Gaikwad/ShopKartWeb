import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudOperationsComponent } from './Component/crud-operations/crud-operations.component';
import { SigninComponent } from './Component/signin/signin.component';
import { SignupComponent } from './Component/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './Component/homepage/homepage.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { SidebarComponent } from './Component/sidebar/sidebar.component';
import { NavbarComponent } from './Component/navbar/navbar.component';
import { SliderComponent } from './Component/slider/slider.component';
import { ClothsComponent } from './Component/cloths/cloths.component';
import { ShoesComponent } from './Component/shoes/shoes.component';
import { CosmeticsComponent } from './Component/cosmetics/cosmetics.component';
import { ClothDetailsComponent } from './Component/cloths/cloth-details/cloth-details.component';
import { CartComponent } from './Component/cart/cart.component';
import { InventryComponent } from './Component/inventry/inventry.component';
import { MainComponent } from './Component/main/main.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BillingComponent } from './Component/billing/billing.component';
import { FooterComponent } from './Component/footer/footer.component';
import { ReviewsComponent } from './Component/reviews/reviews.component';



@NgModule({
  declarations: [
    AppComponent,
    CrudOperationsComponent,
    SigninComponent,
    SignupComponent,
    HomepageComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    SliderComponent,
    ClothsComponent,
    ShoesComponent,
    CosmeticsComponent,
    ClothDetailsComponent,
    CartComponent,
    InventryComponent,
    MainComponent,
    BillingComponent,
    FooterComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
