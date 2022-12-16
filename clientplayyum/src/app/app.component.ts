import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getCookie } from 'typescript-cookie';
import { Member } from './member/member';
import { MemberService } from './member/member.service';
@Component({
  selector: 'app-playyum',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title: string = '';
  loginInfo: string = '';
  constructor(private router: Router, private memberService: MemberService) {
    // if they refresh the page and setTitle doesn't run we'll grab the window path
    this.title === ''
      ? this.setTitle(
          window.location.pathname.substring(1, window.location.pathname.length)
        )
      : null;

    let cookieString: string | undefined = getCookie("loginId");
    let idInt = -1;
    if (cookieString !== undefined) {
      idInt = parseInt(cookieString);
    }
    if(idInt !== -1)
    {
      this.memberService.getOne(idInt).subscribe({
        next: (emp: Member) => {
          this.loginInfo = `${emp.username} Points:${emp.points}   `;
        },
        error: (err: Error) => {},
      });
    }
    this.loginInfo = "";
  }

  setTitle(title: string) {
    this.title = title;

    let cookieString: string | undefined = getCookie("loginId");
    let idInt = -1;
    if (cookieString !== undefined) {
      idInt = parseInt(cookieString);
    }
    if(idInt !== -1)
    {
      this.memberService.getOne(idInt).subscribe({
        next: (emp: Member) => {
          this.loginInfo = `${emp.username} Points:${emp.points}   `;
        },
        error: (err: Error) => {},
      });
    }
    this.loginInfo = "";
  }
}
