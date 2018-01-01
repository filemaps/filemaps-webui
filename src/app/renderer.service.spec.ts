// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';

import { CommandService } from './commands/command.service';
import { Renderer } from './renderer.service';

describe('RenderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandService,
        Renderer,
      ]
    });
  });

  it('should be created', inject([Renderer], (service: Renderer) => {
    expect(service).toBeTruthy();
  }));
});
