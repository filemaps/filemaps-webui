// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapsModalComponent } from './maps-modal/maps-modal.component';
import { MaterializeModule } from 'ng2-materialize';

import { SharedModule } from '../shared/shared.module';
import { NewMapModalComponent } from './new-map-modal/new-map-modal.component';
import { MapSettingsModalComponent } from './map-settings-modal/map-settings-modal.component';
import { AddResourceModalComponent } from './add-resource-modal/add-resource-modal.component';
import { EditResourcesModalComponent } from './edit-resources-modal/edit-resources-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterializeModule,
    SharedModule,
  ],
  exports: [
    AddResourceModalComponent,
    EditResourcesModalComponent,
    MapsModalComponent,
    NewMapModalComponent,
    MapSettingsModalComponent,
  ],
  declarations: [
    AddResourceModalComponent,
    MapsModalComponent,
    NewMapModalComponent,
    MapSettingsModalComponent,
    EditResourcesModalComponent,
  ],
  entryComponents: [
    AddResourceModalComponent,
    MapsModalComponent,
    NewMapModalComponent,
    MapSettingsModalComponent,
  ],
})
export class FilemapModule { }
