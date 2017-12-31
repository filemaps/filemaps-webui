// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from './position';
import { ThreeFileMap } from './three-file-map';
import { ThreeResource } from './three-resource';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    Position,
    ThreeFileMap,
    ThreeResource,
  ],
  declarations: []
})
export class ModelsModule { }
