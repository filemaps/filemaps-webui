// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { DataService } from '../../data.service';
import { DirContents } from '../../models/dir-contents';
import { FileInfo } from '../../models/file-info';

@Component({
  selector: 'app-file-browser',
  templateUrl: './file-browser.component.html',
  styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {

  @Input() onlyFileMaps: boolean;
  @Input() onlyDirs: boolean;
  @Output() entryClick = new EventEmitter<FileInfo>();
  @Output() dirChange = new EventEmitter<DirContents>();
  currentPath: string;
  entries: FileInfo[] = [];

  private dirContents = new DirContents();

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
    const initPath = this.dataService.info.homeDir;
    this.loadDir(initPath);
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
        (dirContents) => {
          this.dirContents = dirContents;
          this.filterEntries();
          this.dirChange.emit(dirContents);
        }
      );
  }

  /**
   * Filters entries on the directory listing.
   */
  private filterEntries() {
    if (this.onlyFileMaps) {
      // filter in directories and *.filemap
      this.entries = [];
      this.dirContents.contents.forEach(fileInfo => {
        if (fileInfo.isDir() || fileInfo.name.match(/\.filemap$/)) {
          this.entries.push(fileInfo);
        }
      });
    } else if (this.onlyDirs) {
      this.entries = [];
      this.dirContents.contents.forEach(fileInfo => {
        if (fileInfo.isDir()) {
          this.entries.push(fileInfo);
        }
      });
    } else {
      this.entries = this.dirContents.contents;
    }
  }
}
