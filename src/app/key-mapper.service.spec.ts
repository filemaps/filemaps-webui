// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';

import { CommandService } from './commands/command.service';
import { KeyMapper } from './key-mapper.service';
import { Renderer } from './renderer.service';

describe('KeyMapper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandService,
        KeyMapper,
        Renderer,
      ]
    });
  });

  it('should be created', inject([KeyMapper], (service: KeyMapper) => {
    expect(service).toBeTruthy();
  }));
});
