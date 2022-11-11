import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayyumDetailComponent } from './playyum-detail.component';

describe('PlayyumDetailComponent', () => {
  let component: PlayyumDetailComponent;
  let fixture: ComponentFixture<PlayyumDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayyumDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayyumDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
