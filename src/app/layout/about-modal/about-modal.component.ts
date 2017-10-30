// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Component, OnInit } from '@angular/core';
import { MzBaseModal } from 'ng2-materialize';

import { DataService } from '../../data.service';
import { Info } from '../../models/info';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss']
})

export class AboutModalComponent extends MzBaseModal implements OnInit {
  info = new Info();

  constructor(
    private dataService: DataService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.info = this.dataService.info;
  }
}
