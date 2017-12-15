// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CommandService } from '../commands/command.service';
import { DataService } from '../data.service';
import { ThreeFileMap } from './three-file-map';
import { Renderer } from '../renderer.service';

describe('ThreeFileMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandService, DataService, Renderer],
      imports: [HttpClientModule],
    });
  });

  it('should create an instance',
    inject([CommandService, DataService, Renderer],
      (commandService: CommandService, data: DataService, renderer: Renderer) => {
        expect(new ThreeFileMap(commandService, data, renderer)).toBeTruthy();
  }));
});
