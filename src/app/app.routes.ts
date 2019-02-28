import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HomeComponent } from './components/home/home.component';
import { ConocenosComponent } from './components/conocenos/conocenos.component';
import { QuehacemosComponent } from './components/quehacemos/quehacemos.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { ContactComponent } from './components/contact/contact.component';
import { AdminComponent } from './components/admin/admin.component';
import { PostComponent } from './components/posts/post.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostViewComponent } from './components/posts/post-view.component';

import { CONOCENOS_ROUTES } from './components/conocenos/conocenos.routes';

import { AuthGuardGuard } from '../app/services/auth-guard.guard';

const APP_ROUTES: Routes = [
    {   path: 'home', 
        component: HomeComponent,
        data: { state: 'home'} 
    },
    {   path: 'conocenos', 
        component: ConocenosComponent,
        data: { state: 'conocenos'}, 
        children:  CONOCENOS_ROUTES
    },
    {   path: 'quehacemos',
        component: QuehacemosComponent,
        data: { state: 'quehacemos'} 
    },
    {   path: 'platforms', 
        component: PlatformsComponent,
        data: { state: 'platforms'} 
    },
    {   path: 'contact', 
        component: ContactComponent,
        data: { state: 'contact'} 
    },
    {   path: 'posts', 
        component: PostsComponent 
    },
    {   path: 'post/:id', 
        component: PostComponent ,
        canActivate: [AuthGuardGuard]
    },
    {   path: 'post-view/:id', 
        component: PostViewComponent 
    },
    {   path: 'admin', 
        component: AdminComponent 
    },
    {   path: '**', 
        pathMatch: 'full', 
        redirectTo:'home' },


];
export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);