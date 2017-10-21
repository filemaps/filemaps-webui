// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';

import { AddResourceModalComponent } from './add-resource-modal.component';
import { DataService } from '../../data.service';
import { FileMapService } from '../../file-map.service';
import { SharedModule } from '../../shared/shared.module';
import { RenderService } from '../../render.service';

describe('AddResourceModalComponent', () => {
  let component: AddResourceModalComponent;
  let fixture: ComponentFixture<AddResourceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResourceModalComponent ],
      imports: [
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
    fixture = TestBed.createComponent(AddResourceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
