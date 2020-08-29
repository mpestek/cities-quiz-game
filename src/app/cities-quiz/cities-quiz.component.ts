import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CapitalCitiesService } from '../services/capital-cities.service';
import { CitiesQuizGame } from '../utils/cities-quiz.game';

@Component({
  selector: 'app-cities-quiz',
  templateUrl: './cities-quiz.component.html',
  styleUrls: ['./cities-quiz.component.scss'],
})
export class CitiesQuizComponent implements AfterViewInit, OnInit {
  
  @ViewChild('map') mapDiv: ElementRef;
  map: google.maps.Map;
  
  placedCitiesMarkers: google.maps.Marker[];

  readonly defaultCenter = { lat: 49.14209912333384, lng: 5.644931731625218 };
  readonly defaultZoom = 4;
  readonly numberOfCities: number;

  private game: CitiesQuizGame;
  private currentGuessMarker: google.maps.Marker;
  private inTransition = false;

  constructor(
    private capitalCitiesService: CapitalCitiesService
  ) {
    this.numberOfCities = this.capitalCitiesService.capitalCities.length;
  }

  ngOnInit() {
    this.game = new CitiesQuizGame(this.capitalCitiesService.capitalCities);
    this.game.init();
  }

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
    this.placedCitiesMarkers = this.capitalCitiesService.capitalCities.map(capitalCity => new google.maps.Marker({
      map: this.map,
      position: capitalCity.position,
      title: capitalCity.name,
      label: capitalCity.name,
      visible: true
    }));
  }

  onMapClicked = (clickEvent: google.maps.MouseEvent) => {
    if (this.inTransition) {
      return;
    }

    if (this.currentGuessMarker) {
      this.currentGuessMarker.setVisible(false);
    }

    this.currentGuessMarker = new google.maps.Marker({
      map: this.map,
      position: clickEvent.latLng,
      draggable: true
    });
  }

  placePin() {
    if (this.inTransition || this.game.hasEnded()) {
      return;
    }

    const cityName = this.game.getCityToBeGuessed().name;
    this.showPinOfCityToBeGuessed(cityName);
    setTimeout(() => this.hidePinOfCityToBeGuessed(cityName), 2000);

    const guessPosition = this.currentGuessMarker.getPosition();
    this.game.guess({ lat: guessPosition.lat(), lng: guessPosition.lng() });
  }

  showPinOfCityToBeGuessed(cityName: string) {
    this.inTransition = true;

    const marker = this.placedCitiesMarkers
      .find(marker => marker.getTitle() === cityName)
      .setVisible(true);
  }

  hidePinOfCityToBeGuessed(cityName: string) {
    const marker = this.placedCitiesMarkers
      .find(marker => marker.getTitle() === cityName)
      .setVisible(false);

    this.inTransition = false;
  }

  startNewGame() {
    this.game.init();
  }

  resetMapPosition() {
    this.map.setCenter(this.defaultCenter);
    this.map.setZoom(this.defaultZoom);
  }
}
