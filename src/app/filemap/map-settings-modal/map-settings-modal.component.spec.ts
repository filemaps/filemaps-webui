// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'ng2-materialize';

import { CommandsModule } from '../../commands/commands.module';
import { DataService } from '../../data.service';
import { FileMapService } from '../../file-map.service';
import { MapSettingsModalComponent } from './map-settings-modal.component';
import { Renderer } from '../../renderer.service';
import { StyleService } from '../../style.service';

describe('MapSettingsModalComponent', () => {
  let component: MapSettingsModalComponent;
  let fixture: ComponentFixture<MapSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSettingsModalComponent ],
      imports: [
        CommandsModule,
        FormsModule,
        HttpClientModule,
        MaterializeModule,
      ],
      providers: [
        DataService,
        FileMapService,
        Renderer,
        StyleService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapSettingsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
