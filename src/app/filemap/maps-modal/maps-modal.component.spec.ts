// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterializeModule } from 'ng2-materialize';
import { Observable } from 'rxjs/Rx';

import { CommandsModule } from '../../commands/commands.module';
import { DataService } from '../../data.service';
import { FileMapService } from '../../file-map.service';
import { Renderer } from '../../renderer.service';
import { MapsModalComponent } from './maps-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { StyleService } from '../../style.service';

describe('MapsModalComponent', () => {
  let component: MapsModalComponent;
  let fixture: ComponentFixture<MapsModalComponent>;
  let dataService: DataService;
  const mapsData = {
    maps: [
      {
        id: 1,
        title: 'Test',
        base: '.',
        file: 'map.filemap',
        opened: '2018-01-02T15:51:05.313660252+02:00',
      },
    ],
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsModalComponent ],
      imports: [
        CommandsModule,
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
    fixture = TestBed.createComponent(MapsModalComponent);
    component = fixture.componentInstance;

    // fake DataService.getAllFileMaps()
    dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getAllFileMaps')
      .and.returnValue(Observable.of(mapsData));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
