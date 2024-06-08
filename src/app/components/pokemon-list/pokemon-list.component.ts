import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  viewSelected: 'card' | 'grid' = 'card';
  loading: boolean = true;
  recordtLimit: number = 10;
  limits: number[] = [10, 20, 50, 100, 150];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.pokemonService
      .getPokemons(this.recordtLimit)
      .subscribe((pokemons) => {
        this.pokemons = pokemons;
        this.loading = false;
      });
  }

  changeView(view: 'card' | 'grid') {
    this.viewSelected = view;
    this.loadPokemons();
  }

}
