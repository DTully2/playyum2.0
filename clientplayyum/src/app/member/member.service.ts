import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Member } from './member';
@Injectable({
  providedIn: 'root',
})
export class MemberService {
  resourceURL: string;
  status: string;
  constructor(public http: HttpClient) {
    this.resourceURL = `${BASEURL}members`;
    this.status = '';
  } // constructor
  /**
   * Retrieves the employeee JSON, then returns the array to a subscriber
   * we're temporarily using an any type (typically a bad idea) because the Spring Boot
   * repository returns all the data in an "embedded" property
   */
  get(): Observable<any> {
    return this.http
      .get(this.resourceURL)
      .pipe(retry(1), catchError(this.handleError));
  } // get
  /**
    * Update an employee on the server using http put, server returns
    * updated employee, then return it as Observable to caller
    */
  update(member: Member): Observable<Member> {
    return this.http
      .put<Member>(`${this.resourceURL}`, member)
      .pipe(retry(1), catchError(this.handleError));
  } // update
  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    error.error instanceof ErrorEvent
      ? // Get client-side error
        (errorMessage = error.error.message)
      : // Get server-side error
        (errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`);
    window.alert(errorMessage); // probably should console.log when going into production
    return throwError(() => errorMessage);
  }
  //   /**
  //    * add an employee on the server via POST, return Observable
  //    */
  add(member: Member): Observable<Member> {
    member.id = 0;
    return this.http
      .post<Member>(this.resourceURL, member)
      .pipe(retry(1), catchError(this.handleError));
  } // add
  //   /**
  //  * delete an employee on the server, return Observable
  //  */
  delete(id: number): Observable<number> {
    return this.http
      .delete<number>(`${this.resourceURL}/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  } // delete
} // Member service
