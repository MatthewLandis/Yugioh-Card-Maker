import { Component } from '@angular/core';

@Component({
  selector: 'app-decks',
  templateUrl: './decks.component.html',
  styleUrls: ['./decks.component.css']
})
export class DecksComponent {
  savedCards = [];
  collection = [];
}
