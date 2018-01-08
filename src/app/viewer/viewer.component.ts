// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import {
  AfterContentInit,
  Component,
  ElementRef,
} from '@angular/core';

import { KeyMapper } from '../key-mapper.service';
import { Renderer } from '../renderer.service';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.css']
})

export class ViewerComponent implements AfterContentInit {

  constructor(
    private element: ElementRef,
    private keyMapper: KeyMapper,
    private renderer: Renderer) {
  }

  ngAfterContentInit() {
    const canvas = this.renderer.init(this.element);
    this.keyMapper.init(canvas);
  }

}
