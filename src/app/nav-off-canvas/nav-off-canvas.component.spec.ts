import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavOffCanvasComponent } from './nav-off-canvas.component';

describe('NavOffCanvasComponent', () => {
  let component: NavOffCanvasComponent;
  let fixture: ComponentFixture<NavOffCanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavOffCanvasComponent]
    });
    fixture = TestBed.createComponent(NavOffCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
