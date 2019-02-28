import { Component, OnInit, ViewChild } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, NavigationStart, NavigationCancel, NavigationEnd} from '@angular/router';
import { SwiperComponent, SwiperDirective, SwiperConfigInterface,
  SwiperScrollbarInterface, SwiperPaginationInterface, SwiperBreakpointsInterface, SwiperAutoplayInterface, SwiperNavigationInterface } from 'ngx-swiper-wrapper';



const breakpoints: SwiperBreakpointsInterface = {
    320: {
        slidesPerView: 1,
        spaceBetween: 10
    },
    // when window width is <= 480px
    480: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is <= 640px
    640: {
      slidesPerView: 2,
      spaceBetween: 30
    }
  };
  const autoplay: SwiperAutoplayInterface = {
    delay: 2000,
    stopOnLastSlide: false
  };
  const navConfig: SwiperNavigationInterface = {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  };

@Component({
  selector: 'app-carousel-news',
  templateUrl: './carousel-news.component.html',
  styles: []
})
export class CarouselNewsComponent implements OnInit {

  posts:Observable<any[]>;
  loading = true;
  
  public config: SwiperConfigInterface = {
   
    runCallbacksOnInit: true,
    normalizeSlideIndex: true,
    initialSlide: 1,
    direction: 'horizontal',
    slidesPerView: 4,
    spaceBetween: 20,
    breakpoints: breakpoints,
    centeredSlides: false,
    keyboard: true,
    mousewheel: false,
    observer: true,
    navigation: navConfig
    
    
};
  

  constructor( private postService:PostService, private router: Router ) { 
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
 
  getPost(key){
    this.postService.getPost(key)
  }

}
