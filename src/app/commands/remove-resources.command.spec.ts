// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RemoveResourcesCommand } from './remove-resources.command';
import { CommandService } from '../commands/command.service';
import { DataService } from '../data.service';
import { Renderer } from '../renderer.service';
import { ThreeFileMap } from '../models/three-file-map';

describe('RemoveResourcesCommand', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommandService, DataService, Renderer],
      imports: [HttpClientModule],
    });
  });

  it('should create an instance',
    inject([CommandService, DataService, Renderer],
      (commandService: CommandService, data: DataService, renderer: Renderer) => {
        const fileMap = new ThreeFileMap(commandService, data, renderer);
        const resources = [];
        expect(new RemoveResourcesCommand(data, resources)).toBeTruthy();
  }));
});