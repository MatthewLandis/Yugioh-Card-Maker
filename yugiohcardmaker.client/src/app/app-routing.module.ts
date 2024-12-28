import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardMakerComponent } from './cardmaker/cardmaker.component';
import { DecksComponent } from './decks/decks.component';

import { AboutComponent } from './about/about.component';
import { CardMakerComponent } from './cardmaker/cardmaker.component';
import { DecksComponent } from './decks/decks.component';

const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'About', component: AboutComponent },
  { path: 'CardMaker', component: CardMakerComponent },
  { path: 'Decks', component: DecksComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
