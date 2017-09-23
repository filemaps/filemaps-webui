import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MaterializeModule, MzModalService } from 'ng2-materialize';

import { AppComponent } from './app.component';
import { RenderService } from './render.service';
import { ViewerComponent } from './viewer/viewer.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        ViewerComponent,
      ],
      imports: [
        HttpModule,
        MaterializeModule,
      ],
      providers: [
        MzModalService,
        RenderService,
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!!');
  // }));
});
