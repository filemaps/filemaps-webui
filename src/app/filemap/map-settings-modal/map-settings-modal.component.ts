// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';

import { CommandService } from '../../commands/command.service';
import { FileMap } from '../../models/file-map';
import { FileMapService } from '../../file-map.service';
import { UpdateFileMapCommand } from '../../commands/update-file-map.command';

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
    private commandService: CommandService,
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
    const cmd = new UpdateFileMapCommand(
      this.fileMapService,
      this.fileMap,
      () => {}
    );

    // make changes
    this.fileMap.title = this.title;
    this.fileMap.description = this.description;
    this.fileMap.exclude = this.exclude.split('\n');
    cmd.saveAfterState(this.fileMap);

    this.commandService.exec(cmd);
  }
}
