// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

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
  searchVisible = false;
  noFileMap = true;

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

        this.noFileMap = false;
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

  public openSearch() {
    this.searchVisible = true;
    // setting focus requires a little delay
    setTimeout(_ => {
      $('#search').focus();
    }, 50);
  }

  public closeSearch() {
    this.searchVisible = false;
  }

  /**
   * hideSideNav hides sideNav using jQuery, because
   * Ng2-Materialize does not support hiding sideNav.
   */
  private hideSideNav() {
    $('#side-nav-button').sideNav('hide');
  }
}
