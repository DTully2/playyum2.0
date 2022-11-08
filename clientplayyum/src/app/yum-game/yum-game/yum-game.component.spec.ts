import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YumGameComponent } from './yum-game.component';

describe('YumGameComponent', () => {
  let component: YumGameComponent;
  let fixture: ComponentFixture<YumGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YumGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YumGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
