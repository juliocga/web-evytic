import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';
import { User } from '../interfaces/user';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';

import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user: BehaviorSubject<User> = new BehaviorSubject(null);

   
  constructor(  private afAuth: AngularFireAuth,private db: AngularFireDatabase, private router:Router){ 


        this.afAuth.authState.pipe(switchMap(auth => {
                if (auth) {
                    return this.db.object('users/' + auth.uid).valueChanges()
                } else {
                    return of(null)
                }
            })
        ).subscribe(user => {
            this.user.next(user)
          })
    }

    googleLogin() {
        const provider = new firebase.auth.GoogleAuthProvider()
        return this.afAuth.auth.signInWithPopup(provider)
          .then(credential =>  {
              this.updateUser(credential.user)
          })
      }
  
      signOut() {
        this.afAuth.auth.signOut();
        this.router.navigate(['posts']);
      }
  
      //// Update user data ////
  
      /// updates database with user info after login
      /// only runs if user role is not already defined in database
      private updateUser(authData) {
        const userData = new User(authData)
        const ref = this.db.object('users/' + authData.uid)
        ref.valueChanges()
           .subscribe( response => {
            if (!response) {
              ref.update(userData)
            }
            
        })
  
      }

                  
 }


