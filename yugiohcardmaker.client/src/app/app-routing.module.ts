import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardMakerComponent } from './cardmaker/cardmaker.component';
import { DecksComponent } from './decks/decks.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'About', component: AboutComponent },
  { path: 'CardMaker', component: CardMakerComponent },
  { path: 'Decks', component: DecksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
