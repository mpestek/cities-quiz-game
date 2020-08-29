import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CapitalCitiesService } from './services/capital-cities.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CitiesQuizComponent } from './cities-quiz/cities-quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    CitiesQuizComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CapitalCitiesService,
    { 
      provide: APP_INITIALIZER, 
      useFactory: (captialCitiesService: CapitalCitiesService) => () => captialCitiesService.load(),
      deps: [CapitalCitiesService],
      multi: true
    } 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
