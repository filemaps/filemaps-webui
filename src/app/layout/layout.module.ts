// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutModalComponent } from './about-modal/about-modal.component';
import { MaterializeModule } from 'ng2-materialize';
import { SettingsModalComponent } from './settings-modal/settings-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
  ],
  exports: [
    AboutModalComponent,
    SettingsModalComponent,
  ],
  declarations: [
    AboutModalComponent,
    SettingsModalComponent
  ],
  entryComponents: [
    AboutModalComponent,
    SettingsModalComponent,
  ],
})
export class LayoutModule { }
