import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, Observable } from 'rxjs';
import { Member } from '../member';

@Component({
  selector: 'app-memberlogin',
  templateUrl: './memberlogin.component.html',
  styleUrls: ['./memberlogin.component.scss']
})
export class MemberloginComponent implements OnInit {
  @Input() selectedEmployee: Member = {
    id: 0,
    password: '',
    email: '',
  };
  //  @Input() members: Member[] | null = null;
  // @Output() cancelled = new EventEmitter();
  // @Output() deleted = new EventEmitter();
  @Output() saved = new EventEmitter();
  msg: string;
  // members$?: Observable<Member[]>;
  member?: Member;
  // hideEditForm: boolean;
  // todo: string;
  // initialLoad: boolean;

  memberForm: FormGroup;
  email: FormControl;
  password: FormControl;
  memberService: any;

  constructor(private builder: FormBuilder) {
    this.email = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl(
      '',
      Validators.compose([Validators.required])
    );

    this.memberForm = new FormGroup({
      email: this.email,
      password: this.password,
    });

    // this.member = {
    //   id: 0,
    //   password: '',
    //   email: '',
    // };
    this.msg = '';
    // this.hideEditForm = true;
    // this.initialLoad = true;
    // this.todo = '';
  } // constructor
  ngOnInit(): void {    

      catchError((err) => (this.msg = err.message));
      // this.memberForm.patchValue({
      //   title: this.selectedEmployee.email,
      //   firstname: this.selectedEmployee.password,
      // });
  } // ngOnInit
  // ngOnInit(): void {
  //   this.msg = 'loading vendors from server...';
  //   (this.vendors$ = this.vendorService.get().pipe(
  //     tap(() => {
  //       if (this.initialLoad) {
  //         this.msg = 'vendors loaded!';
  //         this.initialLoad = false;
  //       }
  //     })
  //   )),
  //     catchError((err) => (this.msg = err.message));
  // } // ngOnInit

  // select(member: Member): void {
  //   this.todo = 'update';
  //   this.member = member;
  //   this.msg = `${member.email} selected`;
  //   this.hideEditForm = !this.hideEditForm;
  // } // select
  updateSelectedMember(): void {
    console.log(this.memberForm.value);
    this.selectedEmployee.email = this.memberForm.value.email;
    this.selectedEmployee.password = this.memberForm.value.password;
    this.saved.emit(this.selectedEmployee);
  }
  // memberLogin() {
  //   console.log(this.memberForm.value);
  // }
  /**
   * cancelled - event handler for cancel button
   */
  // cancel(msg?: string): void {
  //   msg ? (this.msg = 'Operation cancelled') : null;
  //   this.hideEditForm = !this.hideEditForm;
  // } // cancel

  /**
   * update - send changed update to service
   */
  // update(member: Member): void {
  //   this.memberService.update(member).subscribe({
  //     // Create observer object
  //     next: (emp: Member) => (this.msg = `Members ${emp.email} updated!`),
  //     error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
  //     complete: () => (this.hideEditForm = !this.hideEditForm),
  //   });
  // } // update

  /**
   * save - determine whether we're doing and add or an update
   */
  // save(member: Member): void {
  //   member.id ? this.update(member) : this.add(member);
  // } // save
  /**
   * add - send employee to service, receive new employee back
   */
  // add(member: Member): void {
  //   member.id = 0;
  //   this.memberService.add(member).subscribe({
  //     // Create observer object
  //     next: (emp: Member) => {
  //       this.msg = `Member ${emp.id} added!`;
  //     },
  //     error: (err: Error) => (this.msg = `Member not added! - ${err.message}`),
  //     complete: () => (this.hideEditForm = !this.hideEditForm),
  //   });
 // } // add
  /**
   * delete - send employee id to service for deletion
   */
  // delete(member: Member): void {
  //   this.memberService.delete(member.id).subscribe({
  //     // Create observer object
  //     next: (numOfMembersDeleted: number) => {
  //       numOfMembersDeleted === 1
  //         ? (this.msg = `Member ${member.email} deleted!`)
  //         : (this.msg = `Member not deleted`);
  //     },
  //     error: (err: Error) => (this.msg = `Delete failed! - ${err.message}`),
  //     complete: () => (this.hideEditForm = !this.hideEditForm),
  //   });
  //} // delete
  /**
   * newEmployee - create new employee instance
   */
  // newMember(): void {
  //   this.msg = 'New Member';
  //   this.member = {
  //     id: 0,
  //     password: '',
  //     email: '',
  //   };
  //   this.hideEditForm = !this.hideEditForm;
  // } // newVendor
} // VendorHomeComponent
