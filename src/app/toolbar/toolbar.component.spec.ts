// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'ng2-materialize';

import { CommandsModule } from '../commands/commands.module';
import { DataService } from '../data.service';
import { FilemapModule } from '../filemap/filemap.module';
import { FileMapService } from '../file-map.service';
import { Renderer } from '../renderer.service';
import { StyleService } from '../style.service';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [
        CommandsModule,
        HttpClientModule,
        FilemapModule,
        MaterializeModule,
      ],
      providers: [
        DataService,
        FileMapService,
        Renderer,
        StyleService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
