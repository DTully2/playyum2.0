import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { MatComponentsModule } from '../mat-components/mat-components.module';
import { MemberloginComponent } from './memberlogin/memberlogin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { MemberDetailsComponent } from './member-details/member-details.component';


@NgModule({
  declarations: [
    MemberListComponent,   
    MemberHomeComponent, MemberloginComponent, LoginpageComponent, LandingpageComponent, MemberProfileComponent, MemberDetailsComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
    ReactiveFormsModule,
  ]
})
export class MemberModule { }
