// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';

import { DataService } from '../../data.service';
import { FileMapService } from '../../file-map.service';
import { Renderer } from '../../renderer.service';
import { MapsModalComponent } from './maps-modal.component';
import { SharedModule } from '../../shared/shared.module';

describe('MapsModalComponent', () => {
  let component: MapsModalComponent;
  let fixture: ComponentFixture<MapsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsModalComponent ],
      imports: [ HttpModule, MaterializeModule, SharedModule ],
      providers: [
        DataService,
        FileMapService,
        Renderer,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
