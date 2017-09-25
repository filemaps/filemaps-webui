import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit
} from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';
import { DataService } from '../../data.service';
import { FileMap } from '../../file-map';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-maps-modal',
  templateUrl: './maps-modal.component.html',
  styleUrls: ['./maps-modal.component.scss']
})
export class MapsModalComponent extends MzBaseModal implements AfterViewInit, OnInit {
  fileMaps: FileMap[] = [];

  constructor(
    private element: ElementRef,
    private dataService: DataService,
  ) {
    super();
  }

  getFileMaps(): void {
    this.dataService.getAllFileMaps()
      .subscribe(
        (fileMaps) => {
          this.fileMaps = fileMaps;
        }
      );
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    // enable Materialize tabs with jQuery
    $(this.element.nativeElement).find('.tabs').tabs();
  }

  ngOnInit(): void {
    this.getFileMaps();
  }

  onMapClick(fileMap: FileMap): void {
    console.log('File Map selected', fileMap);
    this.dataService.getFileMap(fileMap.id)
      .subscribe(
        (fm) => {
          console.log('FileMap fetched', fm);
        }
      );
  }
}
