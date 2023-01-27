import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentLocation } from 'src/app/model/CurrentLocation';
import { Path } from 'src/app/model/Path';
import { Ride, RideCheck } from 'src/app/model/Ride';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  
  private headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    skip: 'true',
  });

  constructor(private http: HttpClient) {}

  search(street: string): Observable<any> {
    return this.http.get(
      'https://nominatim.openstreetmap.org/search?format=json&q=' + street
    );
  }

  reverseSearch(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&<params>`
    );
  }


  calculateEstimatedPrice(auth: any): Observable<any> {
    return this.http.post(
      'http://localhost:8085/api/unregisteredUser', auth, {
        headers: this.headers,
    });
  }

  //Ovo treba da je get all drivers
  // getVehicles() : Observable<any>{
  //   return this.http.get('http://localhost:8085/api/driver/vehicles');
  // }



  getAllActiveRides(): Observable<Ride[]> {
    return this.http.get<Ride[]>('http://localhost:8085/api/ride/active');
  }



  async createRide(ride : RideCheck) : Promise<Observable<any>> {
    let routeJson : Promise<any> = this.getRouteJSON(ride.locations[0]);
    await routeJson.then(json => {
      ride.routeJSON = JSON.stringify(json);
    });
    return this.http.post<Ride>('http://localhost:8085/api/ride/create', ride);
  }

  getRouteJSON(location : Path) {
    return this.http.get('https://routing.openstreetmap.de/routed-car/route/v1/driving/' + location.departure.longitude + ',' + location.departure.latitude + ';' + location.destination.longitude + ',' + location.destination.latitude + '?geometries=geojson&overview=false&alternatives=true&steps=true', {headers : { 'routeJson' : 'true'}}).toPromise();
  }
  

}
