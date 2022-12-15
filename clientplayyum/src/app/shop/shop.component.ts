import { Component, OnInit } from '@angular/core';
import { Member } from '@app/member/member';
import { MemberService } from '@app/member/member.service';
import { Score } from '@app/yum-game/score';
import { YumService } from '@app/yum-game/yum-game.service';
import { catchError, map, Observable } from 'rxjs';
import { getCookie } from 'typescript-cookie';
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
  loadedScores?: Score[] = [];
  //misc
  msg: string = '';
  constructor(private shopService: ShopService,
    private itemService: ItemService,
    private memberService: MemberService,
    private yumService: YumService) {
    this.member = {
      id: 0,
      password: "",
      email: "",
      username: "",
      points: 0,
      avatar: '',
      dice: 'white'
    };

    // (this.memberService.getOne(1).pipe(
    //   map((members) => {
    //     console.log(members);
    //     this.member = members;
    //   })
    // )),
    //   catchError((err) => (this.msg = err.message));

  }//c'tor

  buy(item: Item): void {
    console.log(item);
    this.member.points -= item.price;
    this.updateMember(this.member);
    console.log(this.member);
    this.createOrder(item,this.member);
  }//buy

  ngOnInit(): void {
    (this.items$ = this.itemService.get());

    let cookieString: string | undefined = getCookie("loginId");
    let idInt = -1;
    if (cookieString !== undefined) {
      idInt = parseInt(cookieString);
    }
    if (idInt !== -1) {
      this.memberService.getOne(idInt).subscribe({
        next: (emp: Member) => {
          console.log(emp.id);
          this.member = emp;
        },
        error: (err: Error) => (this.msg = `Profile not found! - ${err.message}`),
      });
      this.yumService.getUserGames(idInt).subscribe({
        next: (scr: Score[]) => {
          this.loadedScores = scr;
        },
        error: (err: Error) => (this.msg = `Profile not found! - ${err.message}`),
      })
    }


    console.log(this.msg);
  }//ngOnInit

  updateMember(currentMember: Member): void {
    this.memberService.update(currentMember).subscribe({
      // observer object
      next: (mem: Member) => (this.msg = `Member ${mem.username} updated!`),
      error: (err: Error) => (this.msg = `Update failed! - ${err.message}`),
      complete: () => {
      },
    });
  } // update

  createOrder(item: Item, member: Member): void {
    const itemShop : ItemShop = {
      id: (item.id).toString() + (member.id).toString(),
      itemId: item.id,
      memberId: member.id,
      purchaseDate: ''
    }
    console.log(itemShop);
    this.shopService.update(itemShop).subscribe({
      next:(itemShop: ItemShop) => {
        console.log(`purchase ${itemShop.id} added`);
      },
      error: (err: Error) => (console.log(err.message)),
      complete: () => {

      },
    });
  }// createOrder
}
