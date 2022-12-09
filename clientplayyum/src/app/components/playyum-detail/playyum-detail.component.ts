import { DomPortalHost } from '@angular/cdk/portal';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
@Component({
  selector: 'app-playyum-detail',
  templateUrl: './playyum-detail.component.html',
  styleUrls: ['./playyum-detail.component.scss']
})
export class PlayyumDetailComponent implements OnInit {
 

  constructor( private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
  }
  getColor(value: number): string {
    if (value > 75) {
      return '#5ee432';
    } else if (value > 50) {
      return '#fffa50';
    } else if (value > 30) {
      return '#f7aa38';
    } else {
      return '#ef4655';
    }
  }
  doThat(): void {
    console.log('doThat')
    this.router.navigateByUrl('/yum')
  }
}
