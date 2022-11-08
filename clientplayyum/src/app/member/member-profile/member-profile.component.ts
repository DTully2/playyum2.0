import { Component, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import {Member} from '../member'
import { MemberService } from '../member.service';
@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {

  profile = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):" ";
  
  member: Member;
  constructor(public memberService: MemberService) { 

    
    var test = this.profile !== null? JSON.parse(this.profile) : '';
    this.member = {
      id:test.id,
      password: test.password,
      email: test.email,
      username: test.username,
    }
  }//ctr

  ngOnInit(): void {
  }//ngOnInit



}
