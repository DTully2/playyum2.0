import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberHomeComponent } from './member/member-home/member-home.component';
import { MemberloginComponent } from './member/memberlogin/memberlogin.component';
import { LoginpageComponent } from './member/loginpage/loginpage.component';
import { LandingpageComponent } from './member/landingpage/landingpage.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'clientplayyum - Home' },
  { path: '', component: HomeComponent, title: 'clientplayyum - Home' },
  { path: 'members', component: MemberHomeComponent, title: 'clientplayyum - Member'},
  { path: 'memberslogin', component: MemberloginComponent, title: 'clientplayyum - Login' },
  { path: 'loginpage', component: LoginpageComponent, title: 'clientplayyum - Login' },
  { path: 'landingpage', component: LandingpageComponent, title: 'clientplayyum - Landing' },
  { path: 'homepage', component: HomepageComponent, title: 'clientplayyum - Homepage' },
  { path: 'search/:game-search', component: HomeComponent },
  { path: 'details/:id', component: DetailsComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
