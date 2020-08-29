import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CapitalCitiesService } from '../services/capital-cities.service';

@Component({
  selector: 'app-cities-quiz',
  templateUrl: './cities-quiz.component.html',
  styleUrls: ['./cities-quiz.component.scss'],
})
export class CitiesQuizComponent implements AfterViewInit {
  
  @ViewChild('map') mapDiv: ElementRef;
  map: google.maps.Map;

  constructor(
    private capitalCitiesService: CapitalCitiesService
  ) {}

  ngAfterViewInit() {
    this.initMap();
    console.log(this.capitalCitiesService.capitalCities);
  }

  initMap() {
    this.map = new google.maps.Map(this.mapDiv.nativeElement, {
      center: { lat: 47.915774652566114, lng: 11.91214676290381 },
      zoom: 4,
      disableDefaultUI: true      
    });

    this.map.addListener('click', this.onMapClicked);
  }

  onMapClicked(event) {
    console.log(`map clicked`);
  }
}
