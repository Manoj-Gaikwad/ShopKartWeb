import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Component/cart/cart.component';
import { ClothDetailsComponent } from './Component/cloths/cloth-details/cloth-details.component';
import { ClothsComponent } from './Component/cloths/cloths.component';
import { CosmeticsComponent } from './Component/cosmetics/cosmetics.component';
import { HomepageComponent } from './Component/homepage/homepage.component';
import { ShoesComponent } from './Component/shoes/shoes.component';
import { SigninComponent } from './Component/signin/signin.component';
import { SignupComponent } from './Component/signup/signup.component';
import { SliderComponent } from './Component/slider/slider.component';

const routes: Routes = [
  { path: '', component: SliderComponent },
  { path: 'cloths', component: ClothsComponent },
  {path:'cosmetics',component:CosmeticsComponent},
  { path: 'shoes', component: ShoesComponent },
  { path: 'cosmetics', component: CosmeticsComponent },
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'homepage', component: HomepageComponent },
  { path: 'slider', component: SliderComponent },
  { path: 'clothDetails', component: ClothDetailsComponent },
  {path:'shoesDetails',component:ShoesComponent},
  { path: 'cart', component: CartComponent },
  {path:'signUp',component:SignupComponent},
  {path:'signIn',component:SigninComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {


}
