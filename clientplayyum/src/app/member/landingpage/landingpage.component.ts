import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styles: [
  ]
})
export class LandingpageComponent implements OnInit {

  localV = localStorage.getItem('login')?localStorage.getItem('login'):" ";
  profile = localStorage.getItem('member')?localStorage.getItem('member'):" ";
  memberName  = this.profile?.toString().split(",")[0].split(":")[1];
  memberPassword = this.profile?.toString().split(",")[1].split(":")[1];
  memberEmail= this.profile?.toString().split(",")[2].split(":")[1];
  memberId= this.profile?.toString().split(",")[3].split(":")[1].split("}")[0];
  constructor() {
    
   }

  ngOnInit(): void {
  }

}
