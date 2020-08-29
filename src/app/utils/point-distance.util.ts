import { LatLng } from '../models/lat-lng.model';

var rad = function(x) {
  return x * Math.PI / 180;
};

export function getDistanceInMeters(p1: LatLng, p2: LatLng) {
  var R = 6378137;

  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  return d;
};

export function getDistanceInKilometers(p1: LatLng, p2: LatLng) {
  return Math.round(getDistanceInMeters(p1, p2) / 1000);
}