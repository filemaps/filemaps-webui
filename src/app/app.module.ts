// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { Renderer } from './renderer.service';
import { ViewerComponent } from './viewer/viewer.component';
import { FilemapModule } from './filemap/filemap.module';
import { FileMapService } from './file-map.service';
import { LayoutModule } from './layout/layout.module';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CommandService } from './commands/command.service';

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
    Renderer,
    Title,
    CommandService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
