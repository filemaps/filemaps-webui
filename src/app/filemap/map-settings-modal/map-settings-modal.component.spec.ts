// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

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
