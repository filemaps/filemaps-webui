// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { RenderService } from './render.service';
import { ViewerComponent } from './viewer/viewer.component';
import { FilemapModule } from './filemap/filemap.module';
import { LayoutModule } from './layout/layout.module';
import { AboutModalComponent } from './layout/about-modal/about-modal.component';
import { MapsModalComponent } from './filemap/maps-modal/maps-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FilemapModule,
    MaterializeModule.forRoot(),
    LayoutModule,
  ],
  providers: [
    RenderService,
  ],
  entryComponents: [
    AboutModalComponent,
    MapsModalComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
