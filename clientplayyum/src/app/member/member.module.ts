import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { MemberloginComponent } from './memberlogin/memberlogin.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MemberListComponent,   
    MemberHomeComponent, MemberloginComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
  ]
})
export class MemberModule { }
