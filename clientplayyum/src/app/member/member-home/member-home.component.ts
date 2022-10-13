import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';


@Component({
  templateUrl: 'member-home.component.html',
})
export class MemberHomeComponent implements OnInit {
  members: Array<Member>;
  msg: string;
  constructor(public memberService: MemberService) {
    this.members = [];
    this.msg = '';
  } // constructor
  ngOnInit(): void {
    this.msg = 'loading members from server...';
    this.memberService.get().subscribe({
      // Observer object, complete method intrinscally unsubscribes
      next: (payload: any) => {
        this.members = payload._embedded.members;
        this.msg = 'members loaded!!';
      },
      error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),

      complete: () => {},
    }); // subscribe
  } // ngOnInit
} // MemberHomeComponent


