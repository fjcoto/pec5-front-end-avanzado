import { Component, Input } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon-detail.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() pokemons: PokemonDetail[] = [];
}
