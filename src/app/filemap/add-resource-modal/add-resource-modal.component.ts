// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';

import { FileInfo } from '../../models/file-info';
import { FileMapService } from '../../file-map.service';
import { ResourceDraft } from '../../models/resource-draft';

@Component({
  selector: 'app-add-resource-modal',
  templateUrl: './add-resource-modal.component.html',
  styleUrls: ['./add-resource-modal.component.scss']
})
export class AddResourceModalComponent extends MzBaseModal implements OnInit {

  path: string;

  private selection: FileInfo[];

  constructor(
    private fileMapService: FileMapService,
  ) {
    super();
  }

  ngOnInit() {
    if (this.fileMapService.current) {
      this.path = this.fileMapService.current.base;
    }
  }

  onSelectionChange(selection: FileInfo[]) {
    this.selection = selection;
  }

  add() {
    // use FileMapService for adding new resources
    const drafts: ResourceDraft[] = [];
    for (const fileInfo of this.selection) {
      drafts.push({ path: fileInfo.path, pos: { x: 0, y: 0, z: 0 }});
    }
    this.fileMapService.addResources(drafts);
  }
}
