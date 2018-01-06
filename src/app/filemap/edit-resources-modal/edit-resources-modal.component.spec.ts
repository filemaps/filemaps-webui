// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'ng2-materialize';

import { CommandsModule } from '../../commands/commands.module';
import { DataService } from '../../data.service';
import { EditResourcesModalComponent } from './edit-resources-modal.component';
import { FileMapService } from '../../file-map.service';
import { Renderer } from '../../renderer.service';
import { StyleService } from '../../style.service';

describe('EditResourcesModalComponent', () => {
  let component: EditResourcesModalComponent;
  let fixture: ComponentFixture<EditResourcesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommandsModule,
        HttpClientModule,
        MaterializeModule,
      ],
      declarations: [ EditResourcesModalComponent ],
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
    fixture = TestBed.createComponent(EditResourcesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
