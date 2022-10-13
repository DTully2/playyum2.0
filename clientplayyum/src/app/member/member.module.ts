import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberHomeComponent } from './member-home/member-home.component';
import { MatComponentsModule } from '../mat-components/mat-components.module';


@NgModule({
  declarations: [
    MemberListComponent,   
    MemberHomeComponent
  ],
  imports: [
    CommonModule,
    MatComponentsModule,
  ]
})
export class MemberModule { }
