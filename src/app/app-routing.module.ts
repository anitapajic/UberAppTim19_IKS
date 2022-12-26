import { NgModule } from '@angular/core';
import { RouterModule, Routes } from 'node_modules/@angular/router';

import { LoginComponent } from './components/login/login.component';
import { MapComponent } from './components/map/map/map.component';
import { MapModule } from './components/map/map/map.module';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path : 'login', component: LoginComponent},
  {path : 'register', component: RegistrationComponent},
  {path : 'home', component: MapComponent},
  {path : '**', component: MapComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class  AppRoutingModule { }
