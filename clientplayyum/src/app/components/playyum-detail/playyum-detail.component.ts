import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-playyum-detail',
  templateUrl: './playyum-detail.component.html',
  styleUrls: ['./playyum-detail.component.scss']
})
export class PlayyumDetailComponent implements OnInit {

  constructor() { }

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
}
