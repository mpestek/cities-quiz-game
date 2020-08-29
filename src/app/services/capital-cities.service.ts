import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CapitalCity } from '../models/capital-city.model';

@Injectable()
export class CapitalCitiesService {
  constructor(private httpClient: HttpClient) {}

  capitalCities: CapitalCity[];

  async load() {
    const result: any = await this.httpClient.get('assets/capitalCities.json').toPromise();

    this.capitalCities = result.capitalCities.map(capitalCity => ({
      name: capitalCity.name,
      position: { lat: capitalCity.lat, lng: capitalCity.lng }
    }));
  }
}