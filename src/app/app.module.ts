// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'ng2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CommandService } from './commands/command.service';
import { DataService } from './data.service';
import { FilemapModule } from './filemap/filemap.module';
import { FileMapService } from './file-map.service';
import { KeyMapper } from './key-mapper.service';
import { LayoutModule } from './layout/layout.module';
import { Renderer } from './renderer.service';
import { StyleService } from './style.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ViewerComponent } from './viewer/viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewerComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FilemapModule,
    MaterializeModule.forRoot(),
    LayoutModule,
  ],
  providers: [
    CommandService,
    DataService,
    FileMapService,
    KeyMapper,
    Renderer,
    StyleService,
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
