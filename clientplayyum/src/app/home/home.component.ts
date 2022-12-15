import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginpageComponent } from '@app/member/loginpage/loginpage.component';
import { Member } from '@app/member/member';
import { MemberService } from '@app/member/member.service';
import { Score } from '@app/yum-game/score';
import { YumService } from '@app/yum-game/yum-game.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  loadedScores: Score[] = [];
  allMembers: Member[] = [];
  topScores: ScoreLine[] = [];
  gotYum: boolean = false;
  gotMembers: boolean = true;

  constructor(private yumService: YumService, private memberService: MemberService) { }

  ngOnInit(): void {
    this.memberService.get().subscribe({
      next: (scr: Member[]) => {
        this.allMembers = scr;
        this.gotMembers = true;
        this.updateScores();
      },
      error: (err: Error) => (console.log("no scores found!")),
    });
    this.yumService.get().subscribe({
      next: (scr: Score[]) => {
        scr.sort((a,b) => a.total - b.total);
        this.loadedScores = scr;
        this.gotYum = true;
        this.updateScores();
      },
      error: (err: Error) => (console.log("no scores found!")),
    });
  }

  ngAfterViewInit(): void {
  }

  updateScores() {
    if(this.gotMembers && this.gotYum){
      console.log("GOT EM BOTH!!");
      this.gotMembers = false;
      this.gotYum = false;
      this.loadedScores.forEach(element => {
        var scr: ScoreLine = {
          name: "James",
          total: element.total
        };
        this.allMembers.forEach(memb => {
          if(memb.id === element.userid){
            scr.name = memb.username!!;
          }
        })
        if(this.topScores.length < 10){
          this.topScores.push(scr);
        }
      });
    }
  }

  getPlayerName(userid: number): string {
    var retString: string = "James";
    this.allMembers.forEach(member => {
      if(member.id === userid){
        retString = member.username!!;
      }
    })
    return retString;
  }
}

class ScoreLine {
  name: string = "";
  total: number = 0;
}