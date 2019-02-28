import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  constructor( public auths:AuthService, public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

  login() {
    // this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.auths.googleLogin();
  }
  logout() {
    // this.afAuth.auth.signOut();
    this.auths.signOut();
  }

}
