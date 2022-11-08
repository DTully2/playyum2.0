import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
// added imports
import { MatComponentsModule } from './mat-components/mat-components.module';
import { HomeComponent } from './home/home.component';
import { MemberModule } from './member/member.module';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpHeadersInterceptor } from './interceptors/http-headers.interceptors';
import { HttpErrorsInterceptor } from './interceptors/http-error.interceptors';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DetailsComponent } from './components/details/details.component';
import { GaugeModule } from 'angular-gauge';
import { GameTabsComponent } from './components/game-tabs/game-tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { YumGameModule } from './yum-game/yum-game.module';
@NgModule({
  declarations: [AppComponent, HomeComponent, HomepageComponent, SearchBarComponent, DetailsComponent, GameTabsComponent],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatComponentsModule,
    MemberModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    GaugeModule.forRoot(),
    MatTabsModule,
    YumGameModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
