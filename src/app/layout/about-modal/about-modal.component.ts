// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

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
