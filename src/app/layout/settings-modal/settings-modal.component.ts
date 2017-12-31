// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';

import { DataService } from '../../data.service';
import { ConfigResponse } from '../../models/config-response';
import { Config } from '../../models/config';
import { FileApp } from '../../models/file-app';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent extends MzBaseModal implements OnInit {

  config: Config = new Config();
  configResp: ConfigResponse = new ConfigResponse();
  fileApps: FileApp[] = [];

  constructor(
    private dataService: DataService,
  ) {
    super();
  }

  ngOnInit() {
    this.dataService.getConfig()
      .subscribe(
        (configResp) => {
          this.config = configResp.config;
          this.fileApps = configResp.fileApps;
        }
      );
  }

  save() {
    console.log('save()');
    this.dataService.setConfig(this.config)
      .subscribe(
        (res) => {
          console.log('Response', res);
        }
      );
  }
}
