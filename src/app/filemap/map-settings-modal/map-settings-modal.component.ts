// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

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
