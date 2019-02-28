import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { routerTransition } from '../../_animations/app.animations';

@Component({
  selector: 'app-conocenos',
  animations: [ routerTransition ],
  templateUrl: './conocenos.component.html',
  styles: []
})
export class ConocenosComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
