import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { routerTransition } from '../../_animations/app.animations';


import { Router, Params } from '@angular/router';
import { AngularFireDatabase, AngularFireObject  } from 'angularfire2/database';

import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase/app';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  animations: [ routerTransition ],
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  
    userRef: AngularFireObject<any>;
    user: Observable<any>;

    constructor( public auths:AuthService, private router:Router ) { 

    }
    
    ngOnInit() {
    }

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
    
    login() {
        this.auths.googleLogin().then((data) => {
            this.router.navigate(['']);
            this.user =  this.auths.user;
        })
    }
    
    logout() {
        this.auths.signOut();
    }
}
