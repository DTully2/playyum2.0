import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { BASEURL } from '@app/constants';
import { Member } from './member/member';
@Injectable({
  providedIn: 'root',
})
export class GenericHttpService<T> {
  // can't inject primitives, so use the @Inject decorator on url
  constructor(private httpClient: HttpClient,    @Inject(String) private entity: string  ) {} // constructor
  public add(item: T): Observable<T> {
    return this.httpClient
      .post<T>(`${BASEURL}${this.entity}`, item)
      .pipe(retry(2), catchError(this.handleError));
  } // add

  public update(item: T): Observable<T> {
    return this.httpClient
      .put<T>(`${BASEURL}${this.entity}`, item)
      .pipe(retry(2), catchError(this.handleError));
  } // update

  public get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${BASEURL}${this.entity}`)
      .pipe(retry(2), catchError(this.handleError));
  } // getAll

  public getOne(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${BASEURL}${this.entity}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  } // getOne

  //confirm username and password match
  public confirmUsernameAndPassword(member: Member): Observable<T> {     
    return this.httpClient
      .get<T>(`${BASEURL}members/login?username=${member.username}&password=${member.password}`) 
      .pipe(map((member)=>{localStorage.setItem('member',JSON.stringify(member));return member;}),retry(2), catchError(this.handleError));
  } // confirmUsernameAndPassword


  public delete(id: number): Observable<number> {
    return this.httpClient
      .delete<number>(`${BASEURL}${this.entity}/${id}`)
      .pipe(retry(2), catchError(this.handleError));
  } // delete
  // Error handling
  handleError(error: any) {
    let status: any;
    error.error instanceof ErrorEvent
      ? // Get client-side error
        (status = error.error.message)
      : // Get server-side error
        (status = `Error Code: ${error.status}\nMessage: ${error.message}`);
    window.alert(status);
    return throwError(() => status);
  }

  public getUserGame(UserId: number): Observable<T> {     
    return this.httpClient
      .get<T>(`${BASEURL}scores/unfinished/${UserId}`) 
      .pipe(retry(2), catchError(this.handleError));
  }

  public getUserGames(UserId: number): Observable<T[]> {     
    return this.httpClient
      .get<T[]>(`${BASEURL}scores/${UserId}`) 
      .pipe(retry(2), catchError(this.handleError));
  }

  public getById(UserId: number): Observable<T[]> {     
    return this.httpClient
      .get<T[]>(`${BASEURL}itemshop/${UserId}`) 
      .pipe(retry(2), catchError(this.handleError));
  }
} // GenericHttpService
