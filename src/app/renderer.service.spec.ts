import { TestBed, inject } from '@angular/core/testing';

import { Renderer } from './renderer.service';

describe('RenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Renderer]
    });
  });

  it('should be created', inject([Renderer], (service: Renderer) => {
    expect(service).toBeTruthy();
  }));
});
