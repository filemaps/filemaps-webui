// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  Component,
  OnInit
} from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { AddResourceModalComponent } from '../filemap/add-resource-modal/add-resource-modal.component';
import { FileMapService } from '../file-map.service';
import { RenderService } from '../render.service';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  enabled = false;

  constructor(
    private fileMapService: FileMapService,
    private modalService: MzModalService,
    private renderService: RenderService,
  ) {
    // subscribe to file map change event
    fileMapService.fileMapChanged$.subscribe(
      fileMap => {
        this.enabled = true;
      }
    );
  }

  ngOnInit() {
  }

  launchSelect() {
    this.renderService.startSelect();
  }

  launchAdd() {
    this.modalService.open(AddResourceModalComponent);
  }

  removeSelected() {
    console.log('Remove selected');
  }
}