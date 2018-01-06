// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ng2-materialize';

import { CommandService } from '../../commands/command.service';
import { FileMapService } from '../../file-map.service';
import { RemoveResourcesCommand } from '../../commands/remove-resources.command';
import { Renderer } from '../../renderer.service';
import { Resource } from '../../models/resource';

@Component({
  selector: 'app-edit-resources-modal',
  templateUrl: './edit-resources-modal.component.html',
  styleUrls: ['./edit-resources-modal.component.scss']
})
export class EditResourcesModalComponent implements OnInit {

  @ViewChild('modal') modal: MzModalComponent;

  private resources: Resource[] = [];

  constructor(
    private commandService: CommandService,
    private fileMapService: FileMapService,
    private renderer: Renderer,
  ) { }

  ngOnInit() {
  }

  setResources(resources: Resource[]) {
    this.resources = resources;
  }

  /**
   * Opens modal.
   */
  open() {
    this.modal.open();
  }

  remove() {
    const cmd = new RemoveResourcesCommand(this.fileMapService, this.resources);
    this.commandService.exec(cmd);

    this.renderer.clearSelection();
  }
}
