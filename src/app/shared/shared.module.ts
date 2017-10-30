// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileBrowserComponent } from './file-browser/file-browser.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FileBrowserComponent,
  ],
  exports: [
    FileBrowserComponent,
  ]
})
export class SharedModule { }
