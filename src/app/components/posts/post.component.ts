import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Post } from '../../interfaces/post';
import { AngularFireStorage } from 'angularfire2/storage';

import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { finalize } from 'rxjs/operators';
import { Observable, of } from 'rxjs';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styles: []
})



export class PostComponent implements OnInit {


  public post:any = {
    title:"",
    content:""
  };

  nuevo:boolean = false;
  id:string;
  downloadURL:string;
  uploadPercent:number;

  constructor( private router:Router, public postService:PostService, private activatedRoute:ActivatedRoute, private storage: AngularFireStorage) { 
    this.activatedRoute.params.subscribe(
      parametros => {
        console.log("Inside post.component.ts")
        console.log(parametros)
        console.log(this.post)
        
        this.id = parametros['id']
        if (this.id !== "nuevo") {
          this.postService.getPost( this.id ).subscribe( data => {
             this.post = data;
          })
          
        }
        
      }
    )
  }

  ngOnInit() {
    
  }

  guardar(forma, input){
    console.log('File object:',input.files[0]);
    if ( this.id == "nuevo") {
      this.postService.newPost(this.post, input)
    //falta redirigir  con el router al nuevo post
        this.downloadURL = this.postService.downloadURL
        this.postService.uploadPercent.subscribe( value =>{
            this.uploadPercent = value
        })
    }else{
      console.log("printing before edit")
      console.log(this.post)
      this.postService.editPost(this.id, this.post)
      
    }

    
  }

  agregarNuevo(forma:NgForm){
    this.router.navigate(['/post','nuevo']);
  }
 

}
