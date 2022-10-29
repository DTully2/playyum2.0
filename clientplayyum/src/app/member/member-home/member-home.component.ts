import { Component, OnInit } from '@angular/core';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  templateUrl: 'member-home.component.html',
})
export class MemberHomeComponent implements OnInit {
  members: Array<Member>;
  msg: string;
  hideEditForm: boolean;
  member: Member;
  loginbtn = document.getElementById('loginForm');
  regbtn = document.getElementById('.register');
  constructor(public memberService: MemberService) {
    this.member = {
      id: 0,
      password: '',
      email: '',
    };
    this.members = [];
    this.msg = '';
    this.hideEditForm = false;
  } // constructor
  ngOnInit(): void {
    this.msg = 'loading members from server...';
    // this.memberService.get().subscribe({
    //   // Observer object, complete method intrinscally unsubscribes
    //   next: (payload: any) => {
    //     this.members = payload._embedded.members;
    //     this.msg = 'members loaded!!';
    //   },
    //   error: (err: Error) => (this.msg = `Get failed! - ${err.message}`),

    //   complete: () => {},
    // }); // subscribe
  } // ngOnInit
  /**
   * save - determine whether we're doing and add or an update
   */
  save(vendor: Member): void {
    vendor.id ? this.update(vendor) : this.add(vendor);
  } // save

  check(vendor: Member): void {
    console.log(vendor);
    this.memberService.confirmUsernameAndPassword(vendor).subscribe({
      // Create observer object
      next: (emp: Member) => (this.msg = `Members ${emp?.username} checked!`),
      error: (err: Error) => (this.msg = `Not valid failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // check

  add(vendor: Member): void {
    vendor.id = 0;
    this.memberService.add(vendor).subscribe({
      // Create observer object
      next: (emp: Member) => {
        this.msg = `Vendor ${emp.id} added!`;
      },
      error: (err: Error) => (this.msg = `Vendor not added! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // add
  update(vendor: Member): void {
    this.memberService.update(vendor).subscribe({
      // Create observer object
      next: (emp: Member) => (this.msg = `Members ${emp.email} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => (this.hideEditForm = !this.hideEditForm),
    });
  } // update
  newVendor(): void {
    this.msg = 'New Vendor';
    this.member = {
      id: 0,
      password: '',
      email: '',
    };
    this.hideEditForm = !this.hideEditForm;
  } // newVendor

  showLoginForm(): void {
    this.hideEditForm = true;
  }

  showRegisterForm(): void {
    this.hideEditForm = false;
  }
} // MemberHomeComponent
