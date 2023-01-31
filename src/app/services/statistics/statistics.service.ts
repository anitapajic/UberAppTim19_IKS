import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/model/Filter';
import { FilterRidesFromDate } from 'src/app/model/FilterRidesFromDate';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient, private authService : AuthService) { }



  
  getRideHistory(filter : Filter):Observable<any>{
    let params = new HttpParams();
    if (filter.startDate) {
      params = params.append('startDate', filter.startDate);
    }
    if (filter.endDate) {
      params = params.append('endDate', filter.endDate);
    }

    if(this.authService.getRole() == 'PASSENGER'){
      return this.http.get('http://localhost:8085/api/passenger/' + this.authService.getId() + '/ride', {
        params : params
      });

    }
    if(this.authService.getRole()== 'DRIVER'){
      return this.http.get('http://localhost:8085/api/driver/' + this.authService.getId() + '/ride', {
        params : params
      });
    }

    return this.http.post('http://localhost:8085/api/ride/all', filter);
  }

  getTotalIncome(): Observable<any>{
      return this.http.get('http://localhost:8085/api/statistics/totalIncome')
  }

  getTotalNumberOfRides():Observable<any>{
    return this.http.get('http://localhost:8085/api/statistics/totalRides')
  }

  getTotalNumOfKm(): Observable<any> {
    return this.http.get('http://localhost:8085/api/statistics/km')
  }
  getTodaysIncome(): Observable<any> {
    return this.http.get('http://localhost:8085/api/statistics/todaysIncome')
  }

  getIncomeFromDates(filter : Filter):Observable<any>{
    return this.http.post('http://localhost:8085/api/statistics/date/totalIncome', filter);
  }

  getRidesFromDates(filter2 : FilterRidesFromDate):Observable<any>{
    return this.http.post('http://localhost:8085/api/statistics/date/rides', filter2);
  }

  getRFilterNumOfRides(passengerId : number):Observable<any>{
    return this.http.get('http://localhost:8085/api/statistics/date/passengerRides/' + passengerId);
  }

  getFilterNumOfDriverRides(driverId : number):Observable<any>{
    return this.http.get('http://localhost:8085/api/statistics/date/driverRides/' + driverId);
  }
  getKmOfDriverRides(driverId : number):Observable<any>{
    return this.http.get('http://localhost:8085/api/statistics/driverKm/' + driverId);
  }
  getKmOfPassengerRides(passengerId : number):Observable<any>{
    return this.http.get('http://localhost:8085/api/statistics/passengerKm/' + passengerId);
  }

}
