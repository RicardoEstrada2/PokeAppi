export interface Pokemon {
    name: string;
    id: number;
    sprites: {
      other: {
        "official-artwork": {
          front_default: string;
        };
      };
    };
    types: {
      slot: number;
      type: {
        name: string;
      };
    }[];
    species: {
        url: string
    }
  }

  export interface AllPokemon{
    count: number;
    next: string;
    previous?: string;
    results: {
        name: string;
        url: string;
    }[]
  }

  export interface Species {
    flavor_text_entries: {
        flavor_text: string;
    }[]
  }

  export interface PokemonListName {
    id: string,
    identifier: string,
    species_id: string,
    height: string,
    weight: string,
    base_experience: string,
    order: string,
    is_default: string
  }

  export interface PokemonGenerationsProps {
    id: number;
    name: string;
  }

  export interface PokemonCardProps {
    name: string;
  }

  export interface PokemonGenerations{
    id: number;
    name: string;
  }

  //Detail Pokedex START
  export interface Pokedex {
    abilities:                Ability[];
    base_experience:          number;
    forms:                    Species[];
    game_indices:             GameIndex[];
    height:                   number;
    held_items:               any[];
    id:                       number;
    is_default:               boolean;
    location_area_encounters: string;
    moves:                    Move[];
    name:                     string;
    order:                    number;
    past_abilities:           any[];
    past_types:               any[];
    species:                  Species;
    sprites:                  Sprites;
    stats:                    Stat[];
    types:                    Type[];
    weight:                   number;
  }

  export interface Ability {
      ability:   Species;
      is_hidden: boolean;
      slot:      number;
  }

  export interface Species {
      name: string;
      url:  string;
  }

  export interface GameIndex {
      game_index: number;
      version:    Species;
  }

  export interface Move {
      move:                  Species;
      version_group_details: VersionGroupDetail[];
  }

  export interface VersionGroupDetail {
      level_learned_at:  number;
      move_learn_method: Species;
      version_group:     Species;
  }

  export interface GenerationV {
      "black-white": Sprites;
  }

  export interface GenerationIv {
      "diamond-pearl":        Sprites;
      "heartgold-soulsilver": Sprites;
      platinum:               Sprites;
  }

  export interface Versions {
      "generation-i":    GenerationI;
      "generation-ii":   GenerationIi;
      "generation-iii":  GenerationIii;
      "generation-iv":   GenerationIv;
      "generation-v":    GenerationV;
      "generation-vi":   { [key: string]: Home };
      "generation-vii":  GenerationVii;
      "generation-viii": GenerationViii;
  }

  export interface Sprites {
      back_default:       string;
      back_female:        null;
      back_shiny:         string;
      back_shiny_female:  null;
      front_default:      string;
      front_female:       null;
      front_shiny:        string;
      front_shiny_female: null;
      other?:             Other;
      versions?:          Versions;
      animated?:          Sprites;
  }

  export interface GenerationI {
      "red-blue": RedBlue;
      yellow:     RedBlue;
  }

  export interface RedBlue {
      back_default:      string;
      back_gray:         string;
      back_transparent:  string;
      front_default:     string;
      front_gray:        string;
      front_transparent: string;
  }

  export interface GenerationIi {
      crystal: Crystal;
      gold:    Gold;
      silver:  Gold;
  }

  export interface Crystal {
      back_default:            string;
      back_shiny:              string;
      back_shiny_transparent:  string;
      back_transparent:        string;
      front_default:           string;
      front_shiny:             string;
      front_shiny_transparent: string;
      front_transparent:       string;
  }

  export interface Gold {
      back_default:       string;
      back_shiny:         string;
      front_default:      string;
      front_shiny:        string;
      front_transparent?: string;
  }

  export interface GenerationIii {
      emerald:             OfficialArtwork;
      "firered-leafgreen": Gold;
      "ruby-sapphire":     Gold;
  }

  export interface OfficialArtwork {
      front_default: string;
      front_shiny:   string;
  }

  export interface Home {
      front_default:      string;
      front_female:       null;
      front_shiny:        string;
      front_shiny_female: null;
  }

  export interface GenerationVii {
      icons:                  DreamWorld;
      "ultra-sun-ultra-moon": Home;
  }

  export interface DreamWorld {
      front_default: string;
      front_female:  null;
  }

  export interface GenerationViii {
      icons: DreamWorld;
  }

  export interface Other {
      dream_world:        DreamWorld;
      home:               Home;
      "official-artwork": OfficialArtwork;
  }

  export interface Stat {
      base_stat: number;
      effort:    number;
      stat:      Species;
  }

  export interface Type {
      slot: number;
      type: Species;
  }

  //Detail Pokedex END

  export async function fetchFn(endpoint:string) {
    const response = await fetch(endpoint);
    return response.json();
  }

  export async function fetchAllPokemon({pageParam}:{pageParam? : string}) {
    const response = await fetch(pageParam || 'https://pokeapi.co/api/v2/pokemon/' );
    return response.json();
  }

  export async function fetchPokemon(name:string) {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon/' + name);
    if(!response.ok){
        throw new Error(`Pokemon ${name} not found`);
    }
    return response.json();
  }

  export async function fetchDetailPokedex(name:string){
    const url = `https://pokeapi.co/api/v2/pokemon-species/${name}/`;
    const response = await fetch(url);
    if(!response.ok){
      throw new Error(`Pokemon ${name} not found`);
    }
    // console.log(response.json())
    return response.json();
  }

  export async function fetchOneGenerationPokemon(offset: number, limit:number) {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Generation not found`);
    }
    return response.json();
  }