// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { FileInfo } from '../../models/file-info';
import { FileMap } from '../../models/file-map';
import { FileMapService } from '../../file-map.service';
import { Renderer } from '../../renderer.service';
import { StyleService } from '../../style.service';
import { ThreeFileMap } from '../../models/three-file-map';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-maps-modal',
  templateUrl: './maps-modal.component.html',
  styleUrls: ['./maps-modal.component.scss']
})
export class MapsModalComponent extends MzBaseModal implements AfterViewInit, OnInit {
  @ViewChild('modal') modal: MzModalComponent;
  fileMaps: FileMap[] = [];

  constructor(
    private element: ElementRef,
    private fileMapService: FileMapService,
    private renderer: Renderer,
    private styleService: StyleService,
  ) {
    super();
  }

  getFileMaps(): void {
    this.fileMapService.getMaps(fileMaps => {
      this.fileMaps = fileMaps;
      console.log('File maps', this.fileMaps);
    });
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    // enable Materialize tabs with jQuery
    $(this.element.nativeElement).find('.tabs').tabs();
  }

  ngOnInit(): void {
    this.getFileMaps();
  }

  onMapClick(fileMap: FileMap): void {
    this.fileMapService.loadMap(
      fileMap.id,
      fm => console.log('Map loaded', fm)
    );
  }

  onEntryClick(fileInfo: FileInfo) {
    this.fileMapService.importMap(fileInfo.path, fileMap => {
      this.modal.close();
    });
  }
}
