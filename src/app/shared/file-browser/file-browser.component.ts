// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { DataService } from '../../data.service';
import { DirContents } from '../../models/dir-contents';
import { FileInfo } from '../../models/file-info';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {

  @Output() entryClick = new EventEmitter<FileInfo>();
  currentPath: string;
  dirContents: DirContents = new DirContents();

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.loadDir('/tmp');
  }

  public onClick(fileInfo: FileInfo) {
    if (fileInfo.isDir()) {
      this.loadDir(fileInfo.path);
    } else {
      this.entryClick.emit(fileInfo);
    }
  }

  public moveUp() {
    if (this.dirContents.parent) {
      this.loadDir(this.dirContents.parent);
    }
  }

  private loadDir(path: string) {
    this.currentPath = path;
    this.dataService.readDir(this.currentPath)
      .subscribe(
        (data) => {
          this.dirContents = data;
        }
      );
  }
}
