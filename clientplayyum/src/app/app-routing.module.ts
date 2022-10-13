import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberHomeComponent } from './member/member-home/member-home.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'clientplayyum - Home' },
  { path: '', component: HomeComponent, title: 'clientplayyum - Home' },
  { path: 'members', component: MemberHomeComponent, title: 'clientplayyum - Member'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
