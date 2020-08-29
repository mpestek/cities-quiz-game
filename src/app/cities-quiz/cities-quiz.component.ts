import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CapitalCitiesService } from '../services/capital-cities.service';
import { getDistanceInMeters } from '../utils/point-distance.util';

@Component({
  selector: 'app-cities-quiz',
  templateUrl: './cities-quiz.component.html',
  styleUrls: ['./cities-quiz.component.scss'],
})
export class CitiesQuizComponent implements AfterViewInit {
  
  @ViewChild('map') mapDiv: ElementRef;
  map: google.maps.Map;
  
  markers: google.maps.Marker[];

  readonly defaultCenter = { lat: 49.14209912333384, lng: 5.644931731625218 };
  readonly defaultZoom = 4;

  constructor(
    private capitalCitiesService: CapitalCitiesService
  ) {}

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(this.mapDiv.nativeElement, {
      center: this.defaultCenter,
      zoom: this.defaultZoom,
      disableDefaultUI: true      
    });

    this.removeAllDefaultLabelsFromMap();

    this.map.addListener('click', this.onMapClicked);
    
    this.addCapitalCitiesMarkers();
  }

  removeAllDefaultLabelsFromMap() {
    this.map.set('styles', [
      {
        featureType: "all",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ]);
  }

  addCapitalCitiesMarkers() {
    this.markers = this.capitalCitiesService.capitalCities.map(capitalCity => new google.maps.Marker({
      map: this.map,
      position: { lat: capitalCity.lat, lng: capitalCity.lng },
      title: capitalCity.name,
      label: capitalCity.name,
      visible: false
    }));
  }

  onMapClicked = (clickEvent: google.maps.MouseEvent) => {
    console.log(getDistanceInMeters(this.markers[0].getPosition(), clickEvent.latLng));
  }

  resetMapPosition() {
    this.map.setCenter(this.defaultCenter);
    this.map.setZoom(this.defaultZoom);
  }
}
