import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../interfaces/post';
@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styles: []
})
export class PostViewComponent implements OnInit {
  
   

  public post:any;
  id:string;
  loading:boolean = true;

  public options: Object = {
    pastePlain: true
  }

  constructor(private router: Router, private activatedRoute:ActivatedRoute,private postService:PostService ) { 
    this.activatedRoute.params
    .subscribe( parametros => {
      console.log("This is the information to show");
      this.id = parametros['id']
      this.postService.getPost( this.id ).subscribe( data => {
          console.log( data );
          this.post = data;
          this.loading = false;
          
        })
    })
  }

  ngOnInit() {
  }

}
