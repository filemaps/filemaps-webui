// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import {
  Component,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { MzModalService } from 'ng2-materialize';
import { Subscription } from 'rxjs/Subscription';

import { AddResourceModalComponent } from '../filemap/add-resource-modal/add-resource-modal.component';
import { CommandService } from '../commands/command.service';
import { EditResourcesModalComponent } from '../filemap/edit-resources-modal/edit-resources-modal.component';
import { FileMapService } from '../file-map.service';
import { RemoveResourcesCommand } from '../commands/remove-resources.command';
import { Renderer } from '../renderer.service';
import { Resource } from '../models/resource';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

  enabled = false;
  removeBtnDisabled = true;
  undoBtnDisabled = true;
  redoBtnDisabled = true;

  @ViewChild(AddResourceModalComponent)
  private addResourceModalComponent: AddResourceModalComponent;

  @ViewChild(EditResourcesModalComponent)
  private editResourcesModalComponent: EditResourcesModalComponent;

  private subscriptions: Subscription[] = [];
  private selectedResources: Resource[] = [];

  constructor(
    private commandService: CommandService,
    private fileMapService: FileMapService,
    private modalService: MzModalService,
    private renderer: Renderer,
  ) {
    // subscribe to file map change event
    this.subscriptions.push(fileMapService.fileMapChanged$.subscribe(
      fileMap => {
        this.enabled = true;
      }
    ));

    // subscribe to resource selection change event
    this.subscriptions.push(renderer.selectedResourcesChanged$.subscribe(
      (resources: Resource[]) => {
        if (resources.length) {
          this.removeBtnDisabled = false;
        } else {
          this.removeBtnDisabled = true;
        }
        this.selectedResources = resources;
      }
    ));

    // subscribe to undo stack change event
    this.subscriptions.push(commandService.undoStackChanged$.subscribe(
      size => {
        this.undoBtnDisabled = (size === 0);
      }
    ));

    // subscribe to redo stack change event
    this.subscriptions.push(commandService.redoStackChanged$.subscribe(
      size => {
        this.redoBtnDisabled = (size === 0);
      }
    ));
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  undo() {
    this.commandService.undo();
  }

  redo() {
    this.commandService.redo();
  }

  launchSelect() {
    this.renderer.startSelect();
  }

  launchAdd() {
    this.addResourceModalComponent.open();
  }

  editSelected() {
    this.editResourcesModalComponent.setResources(this.selectedResources);
    this.editResourcesModalComponent.open();
  }
}
