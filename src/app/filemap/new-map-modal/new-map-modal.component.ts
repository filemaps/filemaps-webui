// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import {
  Component,
  OnInit,
} from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';

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
    this.fileMapService.createMap(
      this.title,
      this.basePath,
      this.filename,
      fileMap => {
        console.log('Map imported', fileMap);
      }
    )
  }
}
