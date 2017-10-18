// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Component, OnInit } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { DataService } from './data.service';
import { AboutModalComponent } from './layout/about-modal/about-modal.component';
import { MapsModalComponent } from './filemap/maps-modal/maps-modal.component';
import { NewMapModalComponent } from './filemap/new-map-modal/new-map-modal.component';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private modalService: MzModalService,
    private dataService: DataService,
  ) {
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

  public openAboutModal() {
    this.hideSideNav();
    this.modalService.open(AboutModalComponent);
  }

  /**
   * hideSideNav hides sideNav using jQuery, because
   * Ng2-Materialize does not support hiding sideNav.
   */
  private hideSideNav() {
    $('#side-nav-button').sideNav('hide');
  }
}
