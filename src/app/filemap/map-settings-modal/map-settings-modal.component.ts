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
  description: string;
  exclude: string;

  constructor(
    private fileMapService: FileMapService,
  ) {
    super();
  }

  ngOnInit() {
    this.fileMap = this.fileMapService.current;
    if (this.fileMap) {
      this.title = this.fileMap.title;
      this.description = this.fileMap.description;
      this.exclude = '';
      for (const exclude of this.fileMap.exclude) {
        this.exclude += exclude + '\n';
      }
    }
  }

  save() {
    this.fileMapService.updateFileMap(
      this.fileMapService.current.id,
      this.title,
      this.description,
      this.exclude.split('\n')
    );
  }
}
