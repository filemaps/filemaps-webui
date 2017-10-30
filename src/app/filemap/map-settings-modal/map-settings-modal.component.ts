// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';

import { FileMap } from '../../models/file-map';
import { FileMapService } from '../../file-map.service';

@Component({
  selector: 'app-map-settings-modal',
  templateUrl: './map-settings-modal.component.html',
  styleUrls: ['./map-settings-modal.component.scss']
})
export class MapSettingsModalComponent extends MzBaseModal implements OnInit {

  fileMap: FileMap;
  title: string;

  constructor(
    private fileMapService: FileMapService,
  ) {
    super();
  }

  ngOnInit() {
    this.fileMap = this.fileMapService.current;
    if (this.fileMap) {
      this.title = this.fileMap.title;
    }
  }

  save() {
    this.fileMap.title = this.title;
    this.fileMapService.updateFileMap(this.fileMap);
  }
}
