// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';

import { DataService } from '../../data.service';
import { FileMapService } from '../../file-map.service';
import { MapSettingsModalComponent } from './map-settings-modal.component';
import { Renderer } from '../../renderer.service';

describe('MapSettingsModalComponent', () => {
  let component: MapSettingsModalComponent;
  let fixture: ComponentFixture<MapSettingsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapSettingsModalComponent ],
      imports: [
        FormsModule,
        HttpModule,
        MaterializeModule,
      ],
      providers: [
        DataService,
        FileMapService,
        Renderer,
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
