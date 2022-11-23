import { Component, OnInit } from '@angular/core';
import { MatInkBar } from '@angular/material/tabs';
import { catchError, Observable, map } from 'rxjs';
import { Member } from '../member'
import { MemberService } from '../member.service';
import { YumService } from '../../yum-game/yum-game.service';
import { getCookie, setCookie } from 'typescript-cookie'
import { Score } from '@app/yum-game/score';
@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent implements OnInit {
  msg: string = '';
  memberDataSource$?: Observable<Member>;
  member: Member;
  loadedScores?: Score[] = [];
  loadedMembers: Member[] = [];
  hideEditForm: boolean;
  eProfile: boolean = false;
  viewScore: boolean = false;
  selectedScore?: Score;
  // profile = localStorage.getItem('userInfo')?localStorage.getItem('userInfo'):" ";
  // member: Member;
  // this.member = memberService.getOne(2)[0];
  //   // var test = this.profile !== null? JSON.parse(this.profile) : '';
  constructor(private memberService: MemberService, private yumService: YumService) {
    this.member = {
      id: 0,
      password: "",
      email: "",
      username: "",
      points: 0,
    };
    this.selectedScore = {
      id: -1,
      userid: 0,
      startdate: new Date(),
      finishdate: undefined,
      ones: -1,
      twos: -1,
      threes: -1,
      fours: -1,
      fives: -1,
      sixes: -1,
      threeofakind: -1,
      fourofakind: -1,
      fullhouse: -1,
      highroll: -1,
      yum: -1,
      smstraight: -1,
      lgstraight: -1,
      bonus: -1,
      total: -1,
      roll: 0,
      dicestring: "0,0,0,0,0"
    };
    this.hideEditForm = false;
    // (this.memberService.getOne(1).pipe(
    //   map((members) => {
    //     console.log(members);
    //     this.member = members;
    //   })
    // )),
    //   catchError((err) => (this.msg = err.message));
  }// c'tor

    

    // (this.memberService.getOne(1).pipe(
    //   map((members) => {
    //   console.log(members);
    //   this.member = members;
    //   })
    //   )),
      // catchError((err) => (this.msg = err.message));

  ngOnInit(): void {
    let cookieString: string | undefined = getCookie("loginId");
    let idInt = -1;
    if (cookieString !== undefined) {
      idInt = parseInt(cookieString);
    }
    if(idInt !== -1)
    {
      this.memberService.getOne(idInt).subscribe({
        next: (emp: Member) => {
          console.log(emp.id);
          this.member = emp;
        },
        error: (err: Error) => (this.msg = `Profile not found! - ${err.message}`),
      });
      this.yumService.getUserGames(idInt).subscribe({
        next: (scr: Score[]) => {
          this.loadedScores = scr;
        },
        error: (err: Error) => (this.msg = `Profile not found! - ${err.message}`),
      })
    }


    console.log(this.msg);
  }// OnInit

  openScore(gameId: number){
    this.selectedScore = this.loadedScores?.find((scr) => scr.id === gameId);
    if(this.selectedScore?.id === gameId){
      this.hideEditForm = true;
      this.viewScore = true;
    }
  }

  closeScore() {
    this.hideEditForm = false;
    this.viewScore = false;
  }


  editProfile(): void {
    this.hideEditForm = true;
    this.eProfile = true;
  }//editProfile

  cancel(msg?: string): void {
    this.hideEditForm = false;
    this.eProfile = false;
    console.log("cancelled");
  }//cancel

  update(currentMember: Member): void {
    this.memberService.update(currentMember).subscribe({
      // observer object
      next: (mem: Member) => (this.msg = `Member ${mem.username} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => {
        this.hideEditForm = false;
        this.eProfile = false;
      },
    });
  } // update
}//Class

