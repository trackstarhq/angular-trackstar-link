import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrackstarConnectButtonComponent } from './angular-trackstar-link.component';

describe('TrackstarConnectButtonComponent', () => {
  let component: TrackstarConnectButtonComponent;
  let fixture: ComponentFixture<TrackstarConnectButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackstarConnectButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackstarConnectButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
