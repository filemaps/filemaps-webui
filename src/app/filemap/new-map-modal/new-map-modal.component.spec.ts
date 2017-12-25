// Copyright (c) 2017, CodeBoy. All rights reserved.
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
import { NewMapModalComponent } from './new-map-modal.component';
import { Renderer } from '../../renderer.service';
import { SharedModule } from '../../shared/shared.module';
import { StyleService } from '../../style.service';

describe('NewMapModalComponent', () => {
  let component: NewMapModalComponent;
  let fixture: ComponentFixture<NewMapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMapModalComponent ],
      imports: [
        CommandsModule,
        FormsModule,
        HttpClientModule,
        MaterializeModule,
        SharedModule,
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
    fixture = TestBed.createComponent(NewMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
