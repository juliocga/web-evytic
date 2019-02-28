import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

import { HashLocationStrategy, LocationStrategy} from '@angular/common'

import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { QuehacemosComponent } from './components/quehacemos/quehacemos.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { ContactComponent } from './components/contact/contact.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// Rutas
import { APP_ROUTING } from './app.routes';
import { AdminComponent } from './components/admin/admin.component';


import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/posts/post.component';

// Ng-swipper
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

import { FooterComponent } from './components/shared/footer/footer.component';
import { CarouselNewsComponent } from './components/shared/carousel-news/carousel-news.component';
import { PostViewComponent } from './components/posts/post-view.component';

    // Font awesome
    import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { QuienesSomosComponent } from './components/conocenos/quienes-somos.component';
import { HistoriaComponent } from './components/conocenos/historia.component';
import { TalentoHumanoComponent } from './components/conocenos/talento-humano.component';
import { ModeloPegagogicoComponent } from './components/conocenos/modelo-pegagogico.component';
import { SgcComponent } from './components/conocenos/sgc.component';
import { PlanDesarrolloComponent } from './components/conocenos/plan-desarrollo.component';

// Ngx - lazy load
import { DeferLoadModule } from '@trademe/ng-defer-load';

// HTML editor
import { NgxTrumbowygModule } from 'ngx-trumbowyg';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
   direction: 'horizontal',
  spaceBetween: 40,
    slidesPerView:4
};

@NgModule({
  declarations: [
    AppComponent,
    EditPostComponent,
    PostsListComponent,
    NavbarComponent,
    HomeComponent,
    ConocenosComponent,
    QuehacemosComponent,
    PlatformsComponent,
    ContactComponent,
    AdminComponent,
    PostsComponent,
    PostComponent,
    FooterComponent,
    CarouselNewsComponent,
    PostViewComponent,
    QuienesSomosComponent,
    HistoriaComponent,
    TalentoHumanoComponent,
    ModeloPegagogicoComponent,
    SgcComponent,
    PlanDesarrolloComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    FormsModule,
    SwiperModule,
    AngularFontAwesomeModule,
    AngularFireAuthModule,
    DeferLoadModule,
    NgxTrumbowygModule.withConfig({
      lang: 'es',
      svgPath: '/assets/icons.svg',
      removeformatPasted: true,
      autogrow: true,
      btns: [
          ['formatting'],
          ['strong', 'em', 'del'],
          ['superscript', 'subscript'],
          ['link'],
          ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
          ['unorderedList', 'orderedList'],
          ['horizontalRule'],
          ['removeformat'],
          ['fullscreen']
      ]
    })
  ],
  providers: [AuthService, PostService, AngularFireModule, { provide: SWIPER_CONFIG, useValue: DEFAULT_SWIPER_CONFIG }, { provide:LocationStrategy, useClass:HashLocationStrategy} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
