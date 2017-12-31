// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';

import { CommandService } from './command.service';

describe('CommandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandService]
    });
  });

  it('should be created', inject([CommandService], (service: CommandService) => {
    expect(service).toBeTruthy();
  }));
});
