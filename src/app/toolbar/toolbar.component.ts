// Copyright (c) 2017, CodeBoy. All rights reserved.
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
import { FileMapService } from '../file-map.service';
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

  @ViewChild(AddResourceModalComponent)
  private addResourceModalComponent: AddResourceModalComponent;

  private subscriptions: Subscription[] = [];
  private selectedResources: Resource[] = [];

  constructor(
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
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  launchSelect() {
    this.renderer.startSelect();
  }

  launchAdd() {
    this.addResourceModalComponent.open();
  }

  removeSelected() {
    this.fileMapService.removeResources(this.selectedResources);
    this.renderer.clearSelection();
  }
}
