// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ng2-materialize';

import { AddResourcesCommand } from '../../commands/add-resources.command';
import { CommandService } from '../../commands/command.service';
import { DirContents } from '../../models/dir-contents';
import { FileInfo } from '../../models/file-info';
import { FileMapService } from '../../file-map.service';
import { FileBrowserComponent } from '../../shared/file-browser/file-browser.component';
import { ResourceDraft } from '../../models/resource-draft';
import { ScanResourcesCommand } from '../../commands/scan-resources.command';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-add-resource-modal',
  templateUrl: './add-resource-modal.component.html',
  styleUrls: ['./add-resource-modal.component.scss']
})
export class AddResourceModalComponent implements OnInit {

  path: string;
  activeTab = 'pick';
  tabsInitialized = false;
  modalOptions: Materialize.ModalOptions;
  exclude: string;

  private scanPath: string;

  @ViewChild('modal') modal: MzModalComponent;
  @ViewChild('pickBrowser') pickFileBrowser: FileBrowserComponent;
  @ViewChild('scanBrowser') scanFileBrowser: FileBrowserComponent;

  private selection: FileInfo[];

  constructor(
    private commandService: CommandService,
    private element: ElementRef,
    private fileMapService: FileMapService,
  ) {
    this.modalOptions = {
      ready: (modal, trigger) => {
        if (!this.tabsInitialized) {
          // re-initialize Materialize tabs with jQuery after modal is ready
          $(this.element.nativeElement).find('.tabs').tabs();
          this.tabsInitialized = true;
        }

        this.exclude = '';
        if (this.fileMapService.current) {
          for (const exclude of this.fileMapService.current.exclude) {
            this.exclude += exclude + '\n';
          }
        }
      },
    };
  }

  ngOnInit() {
  }

  onSelectionChange(selection: FileInfo[]) {
    this.selection = selection;
  }

  onDirChange(dirContents: DirContents) {
    this.scanPath = dirContents.path;
  }

  /**
   * Opens modal.
   */
  open() {
    this.modal.open();

    if (!this.path && this.fileMapService.current) {
      this.path = this.fileMapService.current.base;
    }

    // refresh directory listings
    this.pickFileBrowser.loadPath(this.path);
    this.scanFileBrowser.loadPath(this.path);
  }

  add() {
    const drafts: ResourceDraft[] = [];
    for (const fileInfo of this.selection) {
      drafts.push({ path: fileInfo.path, pos: { x: 0, y: 0, z: 0 }});
    }

    const cmd = new AddResourcesCommand(
      this.fileMapService,
      this.fileMapService.current,
      drafts
    );
    this.commandService.exec(cmd);
  }

  scan() {
    console.log('Start scanning', this.scanPath, this.exclude);

    const cmd = new ScanResourcesCommand(
      this.fileMapService,
      this.fileMapService.current,
      this.scanPath,
      this.exclude.split('\n')
    );
    this.commandService.exec(cmd);
  }
}
