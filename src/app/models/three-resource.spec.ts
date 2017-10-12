// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DataService } from '../data.service';
import { RenderService } from '../render.service';
import { ThreeFileMap } from './three-file-map';
import { ThreeResource } from './three-resource';

describe('ThreeResource', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, RenderService],
      imports: [HttpModule],
    });
  });

  it('should create an instance', inject([DataService, RenderService], (data: DataService, render: RenderService) => {
    const fileMap = new ThreeFileMap(data, render);
    expect(new ThreeResource(data, render, fileMap)).toBeTruthy();
  }));
});
