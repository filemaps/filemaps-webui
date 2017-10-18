// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapsModalComponent } from './maps-modal/maps-modal.component';
import { MaterializeModule } from 'ng2-materialize';

import { SharedModule } from '../shared/shared.module';
import { NewMapModalComponent } from './new-map-modal/new-map-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    SharedModule,
  ],
  exports: [
    MapsModalComponent,
    NewMapModalComponent,
  ],
  declarations: [MapsModalComponent, NewMapModalComponent]
})
export class FilemapModule { }
