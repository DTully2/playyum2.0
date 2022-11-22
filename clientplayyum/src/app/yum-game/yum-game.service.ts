import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASEURL } from '../constants';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Score } from './score'
import { GenericHttpService } from '@app/generic-http.service';
@Injectable({
  providedIn: 'root',
})
export class YumService extends GenericHttpService<Score> {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'scores');
    } // constructor
}