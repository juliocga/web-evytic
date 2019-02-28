import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './auth.service';
import * as _ from 'lodash'
import { switchMap } from 'rxjs/operators';
import { Post } from '../interfaces/post';
import { BehaviorSubject } from 'rxjs'
import * as firebase from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable  } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {

    userRoles: Array<string>; // roles of currently logged in user
    post:Observable<any[]>;

    uploadPercent: Observable<number>;
    downloadURL: string;
    // newURL:string;


  constructor( private auth:AuthService, private db:AngularFireDatabase, private storage: AngularFireStorage, public router:Router ) {

    auth.user.pipe( switchMap( user => {
        //Set  an array of  users roles, ie ['admin','author',...]
        return this.userRoles = _.keys(_.get(user, 'roles'))
    }) ).subscribe()


   }

   /// Get Data

  getPosts() {
    return this.db.list('posts')
  }

  getPost(key) {
    return this.db.object<Post>('posts/' + key).valueChanges()
  }


  ///// Authorization Logic /////

  get canRead(): boolean {
    const allowed = ['admin', 'author', 'reader']
    return this.matchingRole(allowed)
  }

  get canEdit(): boolean {
    const allowed = ['admin', 'author']
    return this.matchingRole(allowed)
  }

  get canDelete(): boolean {
    const allowed = ['admin']
    return this.matchingRole(allowed)
  }


  /// Helper to determine if any matching roles exist
  private matchingRole(allowedRoles): boolean {
    return !_.isEmpty(_.intersection(allowedRoles, this.userRoles))
  }


  //// User Actions

  newPost( data, input ){
    console.log("data:");
    console.log(data);

    // Setup to store the file on Firebase Storage
    const file = input.files[0];
    const filePath = 'profiles/'+file.name;

    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Setup to store the entry on the database 
    var newPostKey = firebase.database().ref().child('posts').push().key;
    var postData = new Post( data )
    const ref = this.db.object('posts/' + newPostKey )
    postData['lastModifiedDate'] = Date.now()
    postData['key$']= newPostKey

    
    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {
             fileRef.getDownloadURL().subscribe(
                 value=>{                   
                        //  When image URL is ready, store on post type Object and store it on database
                        postData['photoURL'] = value; 
                                                        
                        return ref.valueChanges().subscribe( response => {
                            delete(postData.key$) 
                            console.log("hello");
                            console.log(postData)
                            ref.update( postData )
                            this.router.navigate(['posts'])
                        })
                       
                 }
             )
        })
     )
    .subscribe()
    
    
    
  }

  editPost(post, newData) {
    console.log("post");
    console.log(post);
    if ( this.canEdit ) {
      delete(newData.key$)
      console.log(newData)  
      return this.db.object('posts/' + post).update(newData)
    }
    else console.log('action prevented!edit')
  }

  deletePost(key) {
    if ( this.canDelete ) {
      return this.db.list('posts/' + key).remove()
    }
    else console.log('action prevented!')
  }


}
