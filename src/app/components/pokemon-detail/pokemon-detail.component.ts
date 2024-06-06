import { Component, OnInit } from '@angular/core';
import { PokemonDetail } from '../../models/pokemon-detail.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {

  pokemon: PokemonDetail;

  constructor(private pokemonService: PokemonService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('Identifier --> ', identifier);

    this.pokemonService.getPokemonById(identifier).subscribe({
      next: (pokemon) => {

        if (!pokemon) {
          return this.router.navigateByUrl('/');
        }

        this.pokemon = pokemon;
        console.log('Pokemon --> ', this.pokemon);
      },
      error: (err) => {
        console.error('Error: ', err);
        this.router.navigateByUrl('/');
      }
    });
  }
}
