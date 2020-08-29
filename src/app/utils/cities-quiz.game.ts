import { CapitalCity } from '../models/capital-city.model';
import { LatLng } from '../models/lat-lng.model';
import { getDistanceInKilometers } from './point-distance.util';
import { GuessedCity } from '../models/guessed-city.model';

export class CitiesQuizGame {
  readonly STARTING_POINTS = 1500;
  readonly CORRECT_GUESS_LIMIT = 50;
  readonly CITIES: CapitalCity[];
  
  private currentPoints: number;
  private cityToBeGuessed: CapitalCity;
  private citiesLeftForGuessing: CapitalCity[];
  private correctlyGuessedCities: GuessedCity[];
  private wasLastGuessCorrect: boolean;

  constructor(
    cities: CapitalCity[]
  ) {
    this.CITIES = cities;
  }

  public init() {
    this.currentPoints = this.STARTING_POINTS;
    this.correctlyGuessedCities = [];
    this.citiesLeftForGuessing = [...this.CITIES];
    this.cityToBeGuessed = this.citiesLeftForGuessing[this.getRandomCityIndex()];
  }

  public guess(position: LatLng) {
    if (this.hasEnded()) {
      return;
    }

    const distance = getDistanceInKilometers(position, this.cityToBeGuessed.position);

    if (distance < this.CORRECT_GUESS_LIMIT) {
      this.correctlyGuessedCities.push({
        city: this.cityToBeGuessed,
        distance
      });
      this.removeCorrectlyGuessedCityFromCitiesLeft();
      this.wasLastGuessCorrect = true;
    } else {
      this.wasLastGuessCorrect = false;
    }

    this.currentPoints -= distance;
    this.cityToBeGuessed = this.citiesLeftForGuessing[this.getRandomCityIndex()];
  }

  public hasEnded() {
    return this.currentPoints < 0 ||
           this.citiesLeftForGuessing.length < 1;
  }

  public getHighscores(): GuessedCity[] {
    this.correctlyGuessedCities.sort((cityA, cityB) => cityA.distance < cityB.distance ? -1 : 1);
    return this.correctlyGuessedCities;
  }

  public getRemainingKilometers() {
    return this.currentPoints;
  }

  public getCityToBeGuessed(): CapitalCity {
    return this.cityToBeGuessed;
  }

  public getWasLastGuessCorrect() {
    return this.wasLastGuessCorrect;
  }

  private removeCorrectlyGuessedCityFromCitiesLeft() {
    const cityIndex = this.citiesLeftForGuessing.findIndex(city => city.name === this.cityToBeGuessed.name);
    this.citiesLeftForGuessing = [
      ...this.citiesLeftForGuessing.slice(0, cityIndex),
      ...this.citiesLeftForGuessing.slice(cityIndex + 1)
    ];
  }

  private getRandomCityIndex() {
    return Math.floor(Math.random() * this.citiesLeftForGuessing.length);
  }
}