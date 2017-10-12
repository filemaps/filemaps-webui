import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';
import { RenderService } from './render.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, RenderService],
      imports: [HttpModule],
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
