import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';
import { FileMapService } from './file-map.service';
import { Renderer } from './renderer.service';

describe('FileMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
      ],
      providers: [
        DataService,
        FileMapService,
        Renderer,
      ]
    });
  });

  it('should be created', inject([FileMapService], (service: FileMapService) => {
    expect(service).toBeTruthy();
  }));
});
