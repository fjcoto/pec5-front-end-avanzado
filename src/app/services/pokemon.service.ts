import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, mergeMap } from 'rxjs';
import { Pokemon } from '../models/pokemon.interface';
import { PokemonDetail } from '../models/pokemon-detail.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private endPoint = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{ results: Pokemon[] }>(this.endPoint + '/pokemon?limit=5')
      .pipe(
        map(response => response.results),
        mergeMap((pokemons: Pokemon[]) => {
          const detailedRequests = pokemons.map(pokemon =>
            this.http.get<PokemonDetail>(pokemon.url).pipe(
              map(details => ({
                id: this.getIdFromUrl(pokemon.url),
                name: details.name,
                url: pokemon.url,
                sprites: details.sprites,
                weight: details.weight
              }))
            )
          );
          return forkJoin(detailedRequests);
        })
      );
  }

  getPokemonById(id: string): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>(this.endPoint + '/pokemon/' + id);
  }

  getIdFromUrl(url: string): number {
    return +url.split('/')[url.split('/').length - 2];
  }

}
