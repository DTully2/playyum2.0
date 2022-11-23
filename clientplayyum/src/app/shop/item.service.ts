import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService extends GenericHttpService<Item>{

  constructor(httpClient: HttpClient) {
    super(httpClient, 'items');
   }
}
