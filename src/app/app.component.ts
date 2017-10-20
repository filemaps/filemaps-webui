// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { MzModalService } from 'ng2-materialize';

import { DataService } from './data.service';
import { AboutModalComponent } from './layout/about-modal/about-modal.component';
import { FileMapService } from './file-map.service';
import { MapsModalComponent } from './filemap/maps-modal/maps-modal.component';
import { MapSettingsModalComponent } from './filemap/map-settings-modal/map-settings-modal.component';
import { NewMapModalComponent } from './filemap/new-map-modal/new-map-modal.component';
import { SettingsModalComponent } from './layout/settings-modal/settings-modal.component';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title: string;

  constructor(
    private modalService: MzModalService,
    private dataService: DataService,
    private fileMapService: FileMapService,
    private titleService: Title,
  ) {
    // subscribe to file map change event
    fileMapService.fileMapChanged$.subscribe(
      fileMap => {
        // change title in nav bar
        this.title = fileMap.title;

        // change page title in browser
        this.titleService.setTitle(this.title + ' · File Maps');
      }
    );
  }

  ngOnInit() {
    // load info from server and store it in DataService
    this.dataService.loadInfo();
  }

  public openNewMapModal() {
    this.hideSideNav();
    this.modalService.open(NewMapModalComponent);
  }

  public openMapsModal() {
    this.hideSideNav();
    this.modalService.open(MapsModalComponent);
  }

  public openSettingsModal() {
    this.hideSideNav();
    this.modalService.open(SettingsModalComponent);
  }

  public openAboutModal() {
    this.hideSideNav();
    this.modalService.open(AboutModalComponent);
  }

  public openMapSettingsModal() {
    this.hideSideNav();
    this.modalService.open(MapSettingsModalComponent);
  }

  /**
   * hideSideNav hides sideNav using jQuery, because
   * Ng2-Materialize does not support hiding sideNav.
   */
  private hideSideNav() {
    $('#side-nav-button').sideNav('hide');
  }
}
