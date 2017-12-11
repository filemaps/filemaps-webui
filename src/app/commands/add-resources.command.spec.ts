// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { AddResourcesCommand } from './add-resources.command';
import { DataService } from '../data.service';
import { Renderer } from '../renderer.service';
import { ThreeFileMap } from '../models/three-file-map';

describe('AddResourcesCommand', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, Renderer],
      imports: [HttpModule],
    });
  });

  it('should create an instance', inject([DataService, Renderer], (data: DataService, renderer: Renderer) => {
    const fileMap = new ThreeFileMap(data, renderer);
    const drafts = [];
    expect(new AddResourcesCommand(data, fileMap, drafts)).toBeTruthy();
  }));
});
