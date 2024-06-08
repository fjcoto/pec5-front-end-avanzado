import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit {

  allPokemons: Pokemon[] = [];
  pokemons: Pokemon[] = [];
  viewSelected: 'card' | 'grid' = 'card';
  loading: boolean = true;
  error: boolean = false;
  recordtLimit: number = 10;
  limits: number[] = [10, 20, 50, 100, 150];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.loadAllPokemons();
  }

  loadAllPokemons(): void {
    this.loading = true;
    this.error = false;
    this.pokemonService
      .getAllPokemons()
      .subscribe({
        next: (pokemons) => {
          if (pokemons.length === 0) {
            this.error = true;
          } else {
            this.allPokemons = pokemons;
            this.updatePokemonList();
          }

          this.loading = false;
        },
        error: (err) => {
          console.log('Error', err);
          this.loading = false;
          this.error = true;
        }
      });
  }

  updatePokemonList(): void {
    this.loading = true;
    setTimeout(() => {
      this.pokemons = this.allPokemons.slice(0, this.recordtLimit);
      this.loading = false;
    }, 200);  
  }

  changeView(view: 'card' | 'grid') {
    this.viewSelected = view;
    this.updatePokemonList();
  }

  onLimitChange(): void {
    this.updatePokemonList();
  }

}
