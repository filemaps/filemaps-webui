// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { RenderService } from './render.service';
import { ViewerComponent } from './viewer/viewer.component';
import { FilemapModule } from './filemap/filemap.module';
import { FileMapService } from './file-map.service';
import { LayoutModule } from './layout/layout.module';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    ToolbarComponent,
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
    DataService,
    FileMapService,
    RenderService,
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
