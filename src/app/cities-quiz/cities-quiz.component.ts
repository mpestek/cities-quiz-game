import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cities-quiz',
  templateUrl: './cities-quiz.component.html',
  styleUrls: ['./cities-quiz.component.scss'],
})
export class CitiesQuizComponent implements OnInit {
  
  map: google.maps.Map;

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 47.915774652566114, lng: 11.91214676290381 },
      zoom: 4
    });
  }
}
