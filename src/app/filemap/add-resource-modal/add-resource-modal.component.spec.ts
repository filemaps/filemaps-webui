// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterializeModule } from 'ng2-materialize';

import { AddResourceModalComponent } from './add-resource-modal.component';
import { DataService } from '../../data.service';
import { FileMapService } from '../../file-map.service';
import { SharedModule } from '../../shared/shared.module';
import { Renderer } from '../../renderer.service';

describe('AddResourceModalComponent', () => {
  let component: AddResourceModalComponent;
  let fixture: ComponentFixture<AddResourceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddResourceModalComponent ],
      imports: [
        FormsModule,
        HttpModule,
        MaterializeModule,
        SharedModule,
      ],
      providers: [
        DataService,
        FileMapService,
        Renderer,
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
