import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  pokemon: Pokemon;

  constructor(private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier --> ', identifier);

    this.pokemonService.getPokemonById(identifier).subscribe((pokemon) => {

      if (!pokemon) {
        return this.router.navigateByUrl('/');
      }

      this.pokemon = pokemon;
      console.log('Pokemon --> ', this.pokemon);
    });
  }

}
