import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from '../member';
import { MemberService } from '../member.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styles: [
  ]
})
export class LoginpageComponent implements OnInit {
  //create a member object
  @Input()member: Member = {
    id: 0,
    password: '',
    email: '',
    username: '',
  };
  
  @Output() check = new EventEmitter();
//store the member object in the local storage
memberLoginForm: FormGroup;
  userName:FormControl;

  password: FormControl;
  memberService: any;
  msg: string;

  constructor(private builder: FormBuilder, private loginuser: MemberService) {  
    this.userName = new FormControl('', Validators.compose([Validators.required]));
    this.password = new FormControl('', Validators.compose([Validators.required]));

    this.memberLoginForm = new FormGroup({      
      password: this.password,
      userName:this.userName
    });

    this.msg = '';

  } // constructor

  ngOnInit(): void {
  }


  updateSelectedMember(): void {
      
    this.member.password = this.memberLoginForm.value.password;
    this.member.username = this.memberLoginForm.value.userName;
    if(this.member.username !== null)
    {
      localStorage.setItem('login', this.member!.username!);
      localStorage.setItem('userInfo', JSON.stringify( this.member));
    }
    // console.log(this.member); 
     this.check.emit(this.member);
  }
}
