// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import {
  Component,
  ElementRef,
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
  @Input() path: string;
  @Input() selectMany: boolean;
  @Output() entryClick = new EventEmitter<FileInfo>();
  @Output() dirChange = new EventEmitter<DirContents>();
  @Output() pathChange = new EventEmitter<string>();
  @Output() selectionChange = new EventEmitter<FileInfo[]>();
  entries: FileInfo[] = [];

  private dirContents = new DirContents();
  private selected: FileInfo[] = [];

  constructor(
    private dataService: DataService,
    private element: ElementRef,
  ) { }

  ngOnInit() {
    if (!this.path) {
      // default path
      this.path = this.dataService.info.homeDir;
    }
    this.loadPath(this.path);
  }

  public onClick(fileInfo: FileInfo) {
    if (fileInfo.isDir()) {
      this.loadPath(fileInfo.path);
      this.element.nativeElement.scrollIntoView();
    } else {
      if (this.selectMany) {

        // try to unselect
        if (this.unselect(fileInfo)) {
          // unselected
          fileInfo.selected = false;
        } else {
          // was not selected so select it
          this.selected.push(fileInfo);
          fileInfo.selected = true;
        }

        this.selectionChange.emit(this.selected);

      }
      this.entryClick.emit(fileInfo);
    }
  }

  public moveUp() {
    if (this.dirContents.parent) {
      this.loadPath(this.dirContents.parent);
    }
  }

  public loadPath(path: string) {
    if (!path) {
      return;
    }

    this.path = path;
    this.pathChange.emit(this.path);

    this.dataService.readDir(this.path)
      .subscribe(
        (dirContents) => {
          this.dirContents = dirContents;
          this.filterEntries();
          this.markSelected();
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

  // Marks selected property for all selected in this.entries
  private markSelected(): void {
    for (const entry of this.entries) {
      if (this.isSelected(entry)) {
        entry.selected = true;
      }
    }
  }

  // Returns true if given FileInfo is selected
  private isSelected(fileInfo: FileInfo): boolean {
    for (const fi of this.selected) {
      if (fi.equals(fileInfo)) {
        return true;
      }
    }
    return false;
  }

  // Unselects given FileInfo. If not selected, returns false.
  private unselect(fileInfo: FileInfo): boolean {
    for (let i = 0; i < this.selected.length; i++) {
      if (this.selected[i].equals(fileInfo)) {
        this.selected.splice(i, 1);
        return true;
      }
    }
    // not found
    return false;
  }
}
