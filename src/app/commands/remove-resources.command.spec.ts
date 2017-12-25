// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { RemoveResourcesCommand } from './remove-resources.command';
import { CommandService } from '../commands/command.service';
import { DataService } from '../data.service';
import { FileMapService } from '../file-map.service';
import { Renderer } from '../renderer.service';
import { StyleService } from '../style.service';
import { ThreeFileMap } from '../models/three-file-map';

describe('RemoveResourcesCommand', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CommandService,
        DataService,
        FileMapService,
        Renderer,
        StyleService
      ],
      imports: [HttpClientModule],
    });
  });

  it('should create an instance',
    inject([CommandService, DataService, FileMapService, Renderer, StyleService],
      (cmds: CommandService, ds: DataService, fms: FileMapService, renderer: Renderer, ss: StyleService) => {
        const fileMap = new ThreeFileMap(cmds, ds, fms, renderer, ss);
        const resources = [];
        expect(new RemoveResourcesCommand(fms, resources)).toBeTruthy();
  }));
});
