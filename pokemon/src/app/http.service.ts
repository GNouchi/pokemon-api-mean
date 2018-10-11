import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { log } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { 
    this.getPokemon();
  }

  getPokemon=()=>{
    const queryurl = 'https://pokeapi.co/api/v2/pokemon/250/';
    let pokemonObservable = this._http.get(queryurl);
    pokemonObservable.subscribe( data => {
          // console.log('pokemon #1 is ', data);
// destructure results into {abil1, abil2, name} or {abilities , name} 
          const { abilities, forms:[ { name } : obj ], } = data;
// map names to an array...could have destructured this out too but it was even more messy and caused namespace conflicts
          const abilityString = abilities.map( ( { ability: { name } }: obj ) => name );
          const finalString = `${name} has ${abilities.length} abilities : ${abilityString}`;
          console.log(finalString);
          
          // Not sure if I was supposed to use .then() promises ? or .next() and generators rather than a nested function? 
          const newurl = abilities[0].ability.url;          
          const arrObservable = this._http.get(newurl);
// regex provided by CertainPerformance via https://stackoverflow.com/a/52753546/9693249
                arrObservable.subscribe( (data) => {
                const pokeString = data.pokemon
                  .map( ( { pokemon }: obj ) => pokemon.name )
                  .join(', ')
                  .replace(/[^,]+,[^,]+,[^,]+,[^,]+,/g, '$&\n');
                  console.log(`There are ${data.pokemon.length} pokemon with the ${data.name} ability: ${pokeString}`);                           
                })
        }
      )
  }





}



// Next, parse through the data to generate a string that contains the most interesting data about your Pokemon.
// For example, "Bulbasaur's abilities are chlorophyll and overgrow."

// Finally, use the data to make another API request to print how many Pokemon share your Pokemon's abilities. For example, "23 Pokemon have the overgrow ability."