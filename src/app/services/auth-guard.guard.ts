import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import * as _ from 'lodash';

import {map, tap} from 'rxjs/operators';  




@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
   constructor( private auth: AuthService, private router:Router){}


   canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

  
      return this.auth.user.pipe(
            map(user => _.has(_.get(user, 'roles'), 'author')),
            tap(authorized => {
              if (!authorized) {
                console.log('route prevented!')
              //  this.router.navigate(['/']);
              }
            }
          )
        )

  }
}
