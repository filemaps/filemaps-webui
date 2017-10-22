// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import {
  AfterContentInit,
  Component,
  ElementRef,
} from '@angular/core';
import { Renderer } from '../renderer.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements AfterContentInit {

  constructor(
    private element: ElementRef,
    private renderer: Renderer) {
  }

  ngAfterContentInit() {
    this.renderer.init(this.element);
  }

}
