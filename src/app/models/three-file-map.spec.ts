// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

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
