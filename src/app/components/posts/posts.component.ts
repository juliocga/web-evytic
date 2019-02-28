import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth, User } from 'firebase/app';
import { AngularFireDatabase, AngularFireObject  } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styles: []
})
export class PostsComponent implements OnInit {

  posts:Observable<any[]>;
  loading = true;
  userRef: AngularFireObject<any>;
  

user: Observable<any>;

  constructor( private postService:PostService, public auths:AuthService, public afAuth: AngularFireAuth ) {

    this.posts = this.postService.getPosts().snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ 
          key: c.payload.key, 
          ...c.payload.val() 
          
        }),this.loading = false)
      )
    )
    

   }

   

  ngOnInit() {
      
  }
  login() {
    this.auths.googleLogin();
  }
  logout() {
    this.auths.signOut();
  }

  getPost(id){
    console.log(id)
      this.postService.getPost(id)
  }

  deletePost(id){
    this.postService.deletePost(id)
  }

}
