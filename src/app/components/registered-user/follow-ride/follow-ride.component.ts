import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-follow-ride',
  templateUrl: './follow-ride.component.html',
  styleUrls: ['./follow-ride.component.css']
})
export class FollowRideComponent {
  constructor(private authService: AuthService){};
  rideHistory: Array<any> = [];
  
  noRides: boolean = false;


  ngOnInit() {
  
  }
}