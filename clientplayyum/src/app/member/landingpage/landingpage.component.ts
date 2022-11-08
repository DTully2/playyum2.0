import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styles: [
  ]
})
export class LandingpageComponent implements OnInit {

  localV = localStorage.getItem('login')?localStorage.getItem('login'):" ";
  constructor() { }

  ngOnInit(): void {
  }

}
