import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styles: []
})
export class PostsListComponent implements OnInit {

    posts:any;

  constructor( public postservice:PostService ) { }

  ngOnInit() {
      this.posts = this.postservice.getPosts();
  }


}
