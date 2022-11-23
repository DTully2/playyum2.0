import { Component, OnInit } from '@angular/core';
import { Member } from '@app/member/member';
import { MemberService } from '@app/member/member.service';
import { catchError, map, Observable } from 'rxjs';
import { Item } from './item';
import { ItemShop } from './item-shop';
import { ItemService } from './item.service';
import { ShopService } from './shop.service';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styles: [
  ]
})
export class ShopComponent implements OnInit {

  //data
  items$?: Observable<Item[]>;
  itemShop$?: Observable<ItemShop[]>;
  member: Member; //current member
  //misc
  msg: string='';
  constructor(private shopService: ShopService,
    private itemService: ItemService,
    private memberService: MemberService) {
    this.member = {
      id: 0,
      password: "",
      email: "",
      username: "",
      points: 0,
    };


    (this.memberService.getOne(1).pipe(
      map((members) => {
        console.log(members);
        this.member = members;
      })
    )),
      catchError((err) => (this.msg = err.message));

  }//c'tor

  buy(item: string): void {
    console.log(item);
  }//buy

  ngOnInit(): void {
   (this.items$ = this.itemService.get());
    
  }//ngOnInit

}
