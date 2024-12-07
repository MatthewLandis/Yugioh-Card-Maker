import { Component } from '@angular/core';
import { CardMakerService } from './cardmaker.service';

@Component({
  selector: 'app-cardmaker',
  templateUrl: './cardmaker.component.html',
  styleUrls: ['./cardmaker.component.css'],
})
export class CardMakerComponent {
  Template = 'Normal';
  Templates = ['Normal', 'Effect', 'Ritual', 'Fusion', 'Synchro', 'Xyz', 'Link', 'Token', 'Spell', 'Trap',
    'Skill', 'Slifer', 'Obelisk', 'Ra', 'DarkSynchro', 'LegendaryDragon'];
  PendulumTemplate = false;
  Attribute = 'Dark';
  Attributes = ['Dark', 'Light', 'Earth', 'Wind', 'Fire', 'Water', 'Divine', 'Spell', 'Trap', 'No Attribute'];
  CardTitle = {
    Title: 'Dark Magician',
    TitleStyle: 'Common',
    TitleStyles: ['Common', 'Rare', 'SecretRare', 'UltraRare']
  };
  LevelType: 'Level' | 'Rank' | 'NegativeLevel' = 'Level';
  Stats = {
    Attack: '2500',
    Defense: '2100',
    Level: 7,
    NegativeLevel: 0,
    Rank: 0,
    LinkRating: 3,
    PendulumScale: 4
  };
  loreOrEffect: 'lore' | 'effect' = 'lore';
  text = {
    lore: 'The ultimate wizard in terms of attack and defense.',
    effect: 'Gains 300 ATK for every "Dark Magician" or "Magician of Black Chaos" in the GYs.',
    pendulum: 'Once per turn: You can target 1 face-up monster your opponent controls; halve its original ATK.'
  };
  MonsterTypes = {
    Primary: 'Spellcaster',
    Core: '',
    Ability: '',
    Last: 'Normal',
  };
  MonsterTypesList = {
    Primary: ['Aqua', 'Beast', 'Beast-Warrior', 'Creator God', 'Cyberse', 'Dinosaur', 'Divine-Beast', 'Dragon',
      'Fairy', 'Fiend', 'Fish', 'Insect', 'Illusion', 'Machine', 'Plant', 'Psychic', 'Pyro', 'Reptile',
      'Rock', 'Sea Serpent', 'Spellcaster', 'Thunder', 'Warrior', 'Winged Beast', 'Wyrm', 'Zombie'],
    Core: ['', 'Ritual', 'Fusion', 'Synchro', 'Dark Synchro', 'Xyz', 'Pendulum', 'Link'],
    Pendulum: 'Pendulum',
    Ability: ['', 'Tuner', 'Spirit', 'Union', 'Gemini', 'Toon', 'Flip'],
    Last: ['', 'Effect', 'Normal', 'Token']
  };
  showCoreType = false;
  showAbilityType = false;
  linkArrows = {
    topLeft: false,
    top: true,
    topRight: false,
    left: false,
    right: false,
    bottomLeft: true,
    bottom: false,
    bottomRight: true
  };
  underLine = 'atkDef';
  LevelRankScales = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
  SpellTrapType = 'Normal';
  SpellTrapTypes = ['Normal', 'Continuous', 'Equip', 'Ritual', 'QuickPlay', 'Counter', 'Field'];

  constructor(private service: CardMakerService) {
    this.service.getDarkMagician().subscribe((result) => {
      console.log(result);
    });
    this.service.getDark().subscribe((result) => {
      console.log(result);
    });

  }

  /**************************************************************************************************************/

  updateMonsterType(event: Event, type: 'Primary' | 'Core' | 'Ability') {
    const value = (event.target as HTMLSelectElement).value;
    if (type === 'Primary') {
      this.MonsterTypes.Primary = value;
    } else if (type === 'Core') {
      this.MonsterTypes.Core = value;
    } else if (type === 'Ability') {
      this.MonsterTypes.Ability = value;
    }
  }

  templateUpdate(event: Event) {
    this.Template = (event.target as HTMLSelectElement).value;
    this.resetLevelStats();
    this.applyTemplateSettings();
    this.updateLastMonsterType();
    this.RemovePendulum();
    this.UpdateHideforSpellTrap();
    this.UpdateUnderline();

  }

  applyTemplateSettings() {
    const templates: { [key: string]: any } = {
      Normal: { Attribute: 'Dark', Core: '', Last: 'Normal', Level: 7, LevelType: 'Level' },
      Token: { Attribute: 'Dark', Core: '', Last: 'Token', Level: 2, LevelType: 'Level' },
      Effect: { Attribute: 'Dark', Core: '', Last: 'Effect', Level: 7, LoreOrEffect: 'effect', LevelType: 'Level' },
      Ritual: { Attribute: 'Dark', Core: 'Ritual', Level: 7, LevelType: 'Level' },
      Fusion: { Attribute: 'Dark', Core: 'Fusion', Level: 7, LevelType: 'Level' },
      Synchro: { Attribute: 'Dark', Core: 'Synchro', Level: 7, LevelType: 'Level' },
      DarkSynchro: { Attribute: 'Dark', Core: 'Dark Synchro', NegativeLevel: 7, LevelType: 'NegativeLevel' },
      Xyz: { Attribute: 'Dark', Core: 'Xyz', Rank: 4, LevelType: 'Rank' },
      Link: { Attribute: 'Dark', Core: 'Link', LevelType: 'Level' },
      Slifer: { Primary: 'Divine-Beast', Core: '', Attribute: 'Divine', Level: 10, LevelType: 'Level' },
      Obelisk: { Primary: 'Divine-Beast', Core: '', Attribute: 'Divine', Level: 10, LevelType: 'Level' },
      Ra: { Primary: 'Divine-Beast', Core: '', Attribute: 'Divine', Level: 10, LevelType: 'Level' },
      Trap: { Attribute: 'Trap', LevelType: 'Level' },
      Spell: { Attribute: 'Spell', LevelType: 'Level' },
      Skill: { Attribute: 'No Attribute', LevelType: 'Level' },
      LegendaryDragon: { Attribute: 'No Attribute', LevelType: 'Level' },
    };



    const settings = templates[this.Template] || {};


    this.MonsterTypes = {
      ...this.MonsterTypes,

      Primary: settings.Primary ?? this.MonsterTypes.Primary,

      Core: settings.Core ?? this.MonsterTypes.Core,

      Last: this.loreOrEffect === 'lore'
        ? (this.MonsterTypes.Core
          ? this.MonsterTypes.Last
          : 'Normal')
        : 'Effect',

    };

    this.Attribute = settings.Attribute ?? this.Attribute;
    this.Stats.Level = settings.Level ?? 0;
    this.Stats.Rank = settings.Rank ?? 0;
    this.Stats.NegativeLevel = settings.NegativeLevel ?? 0;


    this.LevelType = settings.LevelType ?? 'Level';

  }
  /**************************************************************************************************************/
  RemovePendulumCheckbox = false;
  RemovePendulum() {
    const list = ['Normal', 'Effect', 'Fusion', 'Synchro', 'Xyz']
    this.RemovePendulumCheckbox = list.includes(this.Template) ? false : true;
  }
  RemoveForSpellTrap = true;
  UpdateHideforSpellTrap() {
    const list = ['Spell', 'Trap']
    this.RemoveForSpellTrap = list.includes(this.Template) ? false : true;
  }
  UpdateUnderline() {
    this.underLine = this.Template === 'Link' ? 'atkLink' : 'atkDef';
    this.Stats.Defense = this.Template === 'Link' ? '' : '2100';
  }

  resetLevelStats() {
    this.Stats.Level = 0;
    this.Stats.NegativeLevel = 0;
    this.Stats.Rank = 0;
  }
  /**************************************************************************************************************/
  updateLastMonsterType() {
    const list = ['Ritual', 'Fusion', 'Synchro', 'DarkSynchro', 'Xyz', 'Link'];
    if (list.includes(this.Template)) {
      if (this.loreOrEffect == 'effect') {
        this.MonsterTypes.Last = 'Effect';
      } else {
        this.MonsterTypes.Last = '';
      }
    } else if (this.Template === 'Normal') {
      this.loreOrEffect = 'lore';
      this.MonsterTypes.Last = 'Normal';
    } else if (this.Template == 'Token') {
      this.MonsterTypes.Last = 'Token';
      this.loreOrEffect = 'lore';
    } else if (['Effect', 'Slifer', 'Obelisk', 'Ra'].includes(this.Template)) {
      this.MonsterTypes.Last = 'Effect';
      this.loreOrEffect = 'effect';
    }
  }
  /**************************************************************************************************************/
  setLoreOrEffect(option: 'lore' | 'effect') {
    this.loreOrEffect = option;

    if (option === 'effect') {
      if (this.Template === 'Normal') {
        this.Template = 'Effect';
        this.applyTemplateSettings();
      }
      this.MonsterTypes.Last = 'Effect';
    } else if (option === 'lore') {
      if (this.Template === 'Effect') {
        this.Template = 'Normal';
        this.applyTemplateSettings();
      }
      if (!this.MonsterTypes.Core) {
        this.MonsterTypes.Last = 'Normal';
      }
    }
    this.updateLastMonsterType();
  }
  /**************************************************************************************************************/











  imageUrl: string | null = null;

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.imageUrl = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }
  updateLinkRating() {
    this.Stats.LinkRating = Object.values(this.linkArrows).filter(Boolean).length;
  }




  scale = 1;
  adjustText() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) {
      this.scale = 1;
      return;
    }
    const computedStyle = window.getComputedStyle(document.querySelector('.CardTitle')!);
    context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

    // Measure the text width
    const actualWidth = context.measureText(this.CardTitle.Title).width;

    const desiredWidth = 630; // Target width of your container
    const padding = 20; // Adjust padding as needed

    if (actualWidth > desiredWidth - padding) {
      this.scale = (desiredWidth - padding) / actualWidth; // Scale to fit
    } else {
      this.scale = 1; // Reset scale if it fits naturally
    }
  }


  scaleEffect: number = 1; // Initial scaling factor

  adjustEffectText() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      this.scale = 1; // Default scale in case of failure
      return;
    }
    // Set the font style to match the element
    const computedStyle = window.getComputedStyle(document.querySelector('.loreText')!);
    context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

    // Measure the text width
    const actualWidth = context.measureText(this.text.lore).width;

    const desiredWidth = 4300; // Target width of your container

    if (actualWidth > desiredWidth) {
      this.scaleEffect = desiredWidth / actualWidth; // Scale to fit
      (document.querySelector('.loreText') as HTMLElement).style.width = `${100 * 1 / this.scaleEffect}%`
    } else {
      this.scaleEffect = 1; // Reset scale if it fits naturally
      (document.querySelector('.loreText') as HTMLElement).style.width = `${100 * 1 / this.scaleEffect}%`
    }
  }

  scalePendulumEffect: number = 1; // Initial scaling factor

  adjustPendulumEffectText() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      this.scale = 1; // Default scale in case of failure
      return;
    }
    // Set the font style to match the element
    const computedStyle = window.getComputedStyle(document.querySelector('.PendulumText')!);
    context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

    // Measure the text width
    const actualWidth = context.measureText(this.text.pendulum).width;
    const desiredWidth = 2250; // Target width of your container

    if (actualWidth > desiredWidth) {
      this.scalePendulumEffect = desiredWidth / actualWidth; // Scale to fit
      (document.querySelector('.PendulumText') as HTMLElement).style.width = `${100 * 1 / this.scalePendulumEffect}%`
    } else {
      this.scalePendulumEffect = 1; // Reset scale if it fits naturally
      (document.querySelector('.PendulumText') as HTMLElement).style.width = `${100 * 1 / this.scalePendulumEffect}%`
    }
  }


  SpellscaleEffect: number = 1; // Initial scaling factor

  adjustSpellEffectText() {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      this.scale = 1; // Default scale in case of failure
      return;
    }
    // Set the font style to match the element
    const computedStyle = window.getComputedStyle(document.querySelector('.spellText')!);
    context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

    // Measure the text width
    const actualWidth = context.measureText(this.text.lore).width;

    const desiredWidth = 4400; // Target width of your container

    if (actualWidth > desiredWidth) {
      this.SpellscaleEffect = desiredWidth / actualWidth; // Scale to fit
      (document.querySelector('.spellText') as HTMLElement).style.width = `${100 * 1 / this.SpellscaleEffect}%`
    } else {
      this.SpellscaleEffect = 1; // Reset scale if it fits naturally
      (document.querySelector('.spellText') as HTMLElement).style.width = `${100 * 1 / this.SpellscaleEffect}%`
    }
  }


































  scaleMonsterType: number = 1; // Initial scaling factor for monsterType

  adjustMonsterType() {
    setTimeout(() => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        this.scaleMonsterType = 1;
        return;
      }

      const monsterTypeElement = document.querySelector('.monsterType') as HTMLElement;
      if (!monsterTypeElement) {
        this.scaleMonsterType = 1;
        return;
      }

      const computedStyle = window.getComputedStyle(monsterTypeElement);
      context.font = `${computedStyle.fontSize} ${computedStyle.fontFamily}`;

      let fullText = '[' + this.MonsterTypes.Primary;

      if (this.MonsterTypes.Core) {
        fullText += '/' + this.MonsterTypes.Core;
      }

      if (this.PendulumTemplate) {
        fullText += '/Pendulum';
      }

      if (this.MonsterTypes.Ability) {
        fullText += '/' + this.MonsterTypes.Ability;
      }

      if (this.MonsterTypes.Last) {
        fullText += '/' + this.MonsterTypes.Last;
      }

      fullText += ']';


      const actualWidth = context.measureText(fullText).width;
      const desiredWidth = 692;
      const padding = 20;

      this.scaleMonsterType = actualWidth > desiredWidth - padding
        ? (desiredWidth - padding) / actualWidth
        : 1;
    });
  }



  updateAbilityType(newAbility: string) {
    this.MonsterTypes.Ability = newAbility;
    this.adjustMonsterType(); // Trigger the text adjustment
  }

  togglePendulumTemplate() {
    this.PendulumTemplate = !this.PendulumTemplate;
    this.adjustMonsterType(); // Trigger the text adjustment
  }
  ngAfterViewChecked() {
    this.adjustMonsterType();
  }

  saveCard() {
    // Implement the logic to save the card
    const cardData = {
      title: this.CardTitle.Title,
      attribute: this.Attribute,
      stats: this.Stats,
      monsterTypes: this.MonsterTypes,
      lore: this.text.lore,
      pendulumEffect: this.text.pendulum,
      template: this.Template,
      imageUrl: this.imageUrl,
      // Include other card data as needed
    };

    console.log('Card saved:', cardData);

    // Logic to send the cardData to a backend or save locally
    alert('Card saved successfully!');
  }




}

