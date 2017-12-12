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

import { DataService } from '../../data.service';
import { FileInfo } from '../../models/file-info';
import { FileMap } from '../../models/file-map';
import { FileMapService } from '../../file-map.service';
import { Renderer } from '../../renderer.service';
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
    private dataService: DataService,
    private fileMapService: FileMapService,
    private renderer: Renderer,
  ) {
    super();
  }

  getFileMaps(): void {
    this.dataService.getAllFileMaps().subscribe(fileMaps => {
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
    console.log('File Map selected', fileMap);
    this.dataService.getFileMap(fileMap.id)
      .subscribe(
        (fm: FileMap) => {
          this.fileMapService.useFileMap(fm);
        }
      );
  }

  onEntryClick(fileInfo: FileInfo) {
    this.dataService.importMap(fileInfo.path)
      .subscribe(
        (fm: FileMap) => {
          console.log('FileMap imported', fm);
          this.fileMapService.useFileMap(fm);
          this.modal.close();
        }
      );
  }
}
