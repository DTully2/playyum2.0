import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { catchError, forkJoin, map, Observable, retry, throwError } from 'rxjs';
import { APIResponse, Game } from '../models';
import { Member } from '../member/member';
import { BASEURL,environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  entity: any;

  constructor(private http: HttpClient, ) { }

  getGameList(
    ordering:string,
    search?:string,
  ): Observable<APIResponse<Game>> {
    let params = new HttpParams().set('ordering', ordering);

    if(search)
    {
      params = new HttpParams().set('ordering', ordering).set('search', search);
    }
    return this.http.get<APIResponse<Game>>(`${env.BASE_URL}/games`, 
    { 
      params: params 
    });
  }//end getGameList
  getGameDetails(id: string): Observable<Game> {
    const gameInfoRequest = this.http.get(`${env.BASE_URL}/games/${id}`);
    const gameTrailersRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/movies`
    );
    const gameScreenshotsRequest = this.http.get(
      `${env.BASE_URL}/games/${id}/screenshots`
    );

    return forkJoin({
      gameInfoRequest,
      gameScreenshotsRequest,
      gameTrailersRequest,
    }).pipe(
      map((resp: any) => {
        return {
          ...resp['gameInfoRequest'],
          screenshots: resp['gameScreenshotsRequest']?.results,
          trailers: resp['gameTrailersRequest']?.results,
        };
      })
    );
  }//end getGameDetails
}//end class