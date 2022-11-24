import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '@app/generic-http.service';
import { ItemShop } from './item-shop';

@Injectable({
  providedIn: 'root'
})
export class ShopService extends GenericHttpService<ItemShop> {

  constructor(httpClient: HttpClient) {
    super(httpClient, 'itemshop');
   }// c'tor
}
