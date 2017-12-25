// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { CommandsModule } from './commands/commands.module';
import { DataService } from './data.service';
import { FileMapService } from './file-map.service';
import { Renderer } from './renderer.service';
import { StyleService } from './style.service';

describe('FileMapService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CommandsModule,
      ],
      providers: [
        DataService,
        FileMapService,
        Renderer,
        StyleService,
      ]
    });
  });

  it('should be created', inject([FileMapService], (service: FileMapService) => {
    expect(service).toBeTruthy();
  }));
});
