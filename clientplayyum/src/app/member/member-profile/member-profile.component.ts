import { Component, OnInit } from '@angular/core';
import { MatInkBar } from '@angular/material/tabs';
import { catchError, Observable, map } from 'rxjs';
import { Member } from '../member'
import { MemberService } from '../member.service';
import { getCookie, setCookie } from 'typescript-cookie'
@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  msg: string = '';
  memberDataSource$?: Observable<Member>;
  member: Member;
  loadedMembers: Member[] = [];
  hideEditForm: boolean;
  // profile = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):" ";

  // member: Member;
  // this.member = memberService.getOne(2)[0];
  //   // var test = this.profile !== null? JSON.parse(this.profile) : '';
  constructor(private memberService: MemberService) {
    this.member = {
      id: 0,
      password: "",
      email: "",
      username: "",
      points: 0,
    };
    this.hideEditForm = true;
    (this.memberService.getOne(1).pipe(
      map((members) => {
        console.log(members);
        this.member = members;
      })
    )),
      catchError((err) => (this.msg = err.message));
  }// c'tor

  ngOnInit(): void {
    let cookieString: string | undefined = getCookie("loginId");
    let idInt = -1;
    if (cookieString !== undefined) {
      idInt = parseInt(cookieString);
    }
    if (idInt !== -1)
      this.memberService.getOne(1).subscribe({
        next: (emp: Member) => {
          console.log(emp.id);
          this.member = emp;
        },
        error: (err: Error) => (this.msg = `Profile not found! - ${err.message}`),
      }
      );

    console.log(this.msg);
  }// OnInit


  editProfile(): void {
    this.hideEditForm = !this.hideEditForm;
  }//editProfile

  cancel(msg?: string): void {
    this.hideEditForm = !this.hideEditForm;
    console.log("cancelled");
  }//cancel

  update(currentMember: Member): void {
    this.memberService.update(currentMember).subscribe({
      // observer object
      next: (mem: Member) => (this.msg = `Member ${mem.username} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => {
        this.hideEditForm = !this.hideEditForm;
      },
    });
  } // update
}//Class

