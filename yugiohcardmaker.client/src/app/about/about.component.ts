import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.createBackgroundCard();
    setInterval(() => this.createBackgroundCard(), 2000);
  }

  createBackgroundCard(): void {
    const maxCards = 15;
    const cardImagePath = '/assets/card.png';

    const background = document.getElementById('background');
    if (!background) return;

    const currentCards = background.querySelectorAll('.background-card');
    if (currentCards.length >= maxCards) {
      return;
    }

    const card = this.renderer.createElement('img');
    this.renderer.setAttribute(card, 'src', cardImagePath);
    this.renderer.addClass(card, 'background-card');

    const randomPosition = Math.random() * 90;
    card.style.left = `${randomPosition}%`;

    this.renderer.appendChild(background, card);

    card.addEventListener('animationend', () => {
      card.remove();
    });
  }
}
