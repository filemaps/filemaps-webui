// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

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
