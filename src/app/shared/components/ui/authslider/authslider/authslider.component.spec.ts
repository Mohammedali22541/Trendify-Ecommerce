import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthsliderComponent } from './authslider.component';

describe('AuthsliderComponent', () => {
  let component: AuthsliderComponent;
  let fixture: ComponentFixture<AuthsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthsliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
