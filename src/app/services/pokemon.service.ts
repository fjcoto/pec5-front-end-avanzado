import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Pokemon } from '../models/pokemon.interface';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private endPoint = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]> {
    return this.http.get<{results: Pokemon[]}>(this.endPoint + '/pokemon')
    .pipe(map(response => response.results));
  }

  getPokemonById(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(this.endPoint + '/' + id);
  }

}
