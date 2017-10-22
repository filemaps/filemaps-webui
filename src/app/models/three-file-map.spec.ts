// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { DataService } from '../data.service';
import { ThreeFileMap } from './three-file-map';
import { Renderer } from '../renderer.service';

describe('ThreeFileMap', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService, Renderer],
      imports: [HttpModule],
    });
  });

  it('should create an instance', inject([DataService, Renderer], (data: DataService, renderer: Renderer) => {
    expect(new ThreeFileMap(data, renderer)).toBeTruthy();
  }));
});
