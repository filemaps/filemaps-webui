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
import { NewMapModalComponent } from './new-map-modal.component';
import { RenderService } from '../../render.service';
import { SharedModule } from '../../shared/shared.module';

describe('NewMapModalComponent', () => {
  let component: NewMapModalComponent;
  let fixture: ComponentFixture<NewMapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMapModalComponent ],
      imports: [
        FormsModule,
        HttpModule,
        MaterializeModule,
        SharedModule,
      ],
      providers: [
        DataService,
        FileMapService,
        RenderService,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
