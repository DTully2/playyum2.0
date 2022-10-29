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
    username: '',
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
  userName:FormControl;
  email: FormControl;
  password: FormControl;
  memberService: any;

  constructor(private builder: FormBuilder) {
    this.email = new FormControl('', Validators.compose([Validators.required]));
    this.userName = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl(
      '',
      Validators.compose([Validators.required])
    );

    this.memberForm = new FormGroup({
      email: this.email,
      password: this.password,
      userName:this.userName
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
    this.selectedEmployee.username = this.memberForm.value.userName;
    this.saved.emit(this.selectedEmployee);
  }

} // VendorHomeComponent
