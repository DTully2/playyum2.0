import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { APIResponse, Game } from '@app/models';
import { Subscription } from 'rxjs';
import { HttpService } from '@app/services/http.service';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public sort!: string ;
  public games!: Array<Game> ;
  //to avoif memory leak we will create a Subscription to watch for changes in the params
  private routeSub!: Subscription;
  private gameSub!: Subscription;


  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
   this.routeSub= this.activatedRoute.params.subscribe((params:Params) => {
      if(params['game-search']){
        this.searchGames('metacrit', params['game-search']);
      }else{
        this.searchGames('metacrit');
      }
    });

    
  } 

  searchGames(sort: string,Search?: string):void {
   this.gameSub= this.httpService.getGameList(sort,Search)
   .subscribe((gameList:APIResponse<Game>) => {
    this.games = gameList.results;
    console.log(gameList);
    });  
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);   
  }
  doThis(): void {
    console.log('do this');
  }
  ngOnDestroy(): void {
    if(this.gameSub){
    this.gameSub.unsubscribe();
    }
    if(this.routeSub){
      this.routeSub.unsubscribe();
    }
  }
}