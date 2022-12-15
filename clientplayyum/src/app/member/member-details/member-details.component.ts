import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, AbstractControl, Form } from '@angular/forms';
import { Member } from '../member';
@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
})
export class MemberDetailsComponent implements OnInit {
  @Input() currentMember: Member = {
    id: 0,
    username: '',
    email: '',
    password: '',
    points: 0,
    avatar: '',
    dice: ''
  }

  @Output() cancelled = new EventEmitter();
  @Output() saved = new EventEmitter();
  @Output() deleted = new EventEmitter();


  memberForm: FormGroup;
  id: FormControl;
  username: FormControl;
  email: FormControl;
  password: FormControl;
  constructor(private builder: FormBuilder) {
    this.id = new FormControl();
    this.username = new FormControl();
    this.email = new FormControl();
    this.password = new FormControl();

    this.memberForm = this.builder.group({
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
    })
  }//c'tor

  ngOnInit(): void {
    this.memberForm.patchValue({
      id: this.currentMember.id,
      username: this.currentMember.username,
      email: this.currentMember.email,
      password: this.currentMember.password,
    })
  }//ngOnInit

  updateCurrentMember(): void {
    this.currentMember.id = this.memberForm.value.id;
    this.currentMember.password = this.memberForm.value.password;
    this.currentMember.email = this.memberForm.value.email;
    this.currentMember.username = this.memberForm.value.username;

    this.saved.emit(this.currentMember);
  }//updateCurrentMember
}//MemberDetailsComponent
