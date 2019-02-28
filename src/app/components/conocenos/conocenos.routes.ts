import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HistoriaComponent } from './historia.component';
import { ModeloPegagogicoComponent } from './modelo-pegagogico.component';
import { PlanDesarrolloComponent } from './plan-desarrollo.component';
import { QuienesSomosComponent } from './quienes-somos.component';
import { SgcComponent } from './sgc.component';
import { TalentoHumanoComponent } from './talento-humano.component';

export const CONOCENOS_ROUTES: Routes = [
    { path: 'quienesomos', component: QuienesSomosComponent },
    { path: 'historia', component: HistoriaComponent },
    { path: 'talentohumano', component: TalentoHumanoComponent },
    { path: 'modelopedagogico', component: ModeloPegagogicoComponent },
    { path: 'sgc', component: SgcComponent },
    { path: 'plandesarrollo', component: PlanDesarrolloComponent },
    { path: '**', pathMatch: 'full' , redirectTo: 'quienesomos' },

   
];
