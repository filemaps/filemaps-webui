// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  Component,
  OnInit,
} from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';

import { DataService } from '../../data.service';
import { DirContents } from '../../models/dir-contents';
import { FileMap } from '../../models/file-map';
import { FileMapService } from '../../file-map.service';

@Component({
  selector: 'app-new-map-modal',
  templateUrl: './new-map-modal.component.html',
  styleUrls: ['./new-map-modal.component.scss']
})
export class NewMapModalComponent extends MzBaseModal implements OnInit {
  title: string;
  filename = 'map.filemap';
  private basePath: string;

  constructor(
    private dataService: DataService,
    private fileMapService: FileMapService,
  ) {
    super();
  }

  ngOnInit() {
  }

  onDirChange(dirContents: DirContents) {
    this.basePath = dirContents.path;
  }

  create() {
    this.dataService.createMap(
      this.title,
      this.basePath,
      this.filename
    )
      .subscribe(
        (fm: FileMap) => {
          console.log('FileMap imported', fm);
          this.fileMapService.useFileMap(fm);
        }
      );
  }
}
