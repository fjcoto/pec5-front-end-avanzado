import { Component, Input } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon-detail.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css'
})
export class GridComponent {
  @Input() pokemons: PokemonDetail[] = [];
  displayedColumns: string[] = ['image', 'name'];

  constructor(private router: Router) {}

  goDetails(id: number): void {
    this.router.navigate(['/pokemon', id]);
  }
}
