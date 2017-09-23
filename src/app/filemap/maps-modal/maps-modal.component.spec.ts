import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterializeModule } from 'ng2-materialize';

import { MapsModalComponent } from './maps-modal.component';

describe('MapsModalComponent', () => {
  let component: MapsModalComponent;
  let fixture: ComponentFixture<MapsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsModalComponent ],
      imports: [ MaterializeModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
