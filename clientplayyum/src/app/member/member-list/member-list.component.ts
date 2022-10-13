import { Component, Input, OnInit } from '@angular/core';
import{Member} from '../member';

@Component({
  selector: 'app-member-list',
  template: `
  <mat-list-item *ngFor="let member of members"
    layout="row"
     class="pad-xs- mat-title"
     >

     {{ member.id }} - {{ member.username }}, {{ member.email }}
</mat-list-item>
`,
})
export class MemberListComponent {
@Input() members?: Member[];
}
//MemberListComponent
