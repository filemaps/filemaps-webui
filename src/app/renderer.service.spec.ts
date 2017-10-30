// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

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
