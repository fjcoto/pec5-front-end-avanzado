import { Component, Input } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon-detail.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() pokemons: PokemonDetail[] = [];

  constructor(private router: Router) {}

  goDetails(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
