import {
  AfterViewInit,
  Component,
  ElementRef,
} from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

// declare '$' for jQuery
declare var $: JQueryStatic;

@Component({
  selector: 'app-maps-modal',
  templateUrl: './maps-modal.component.html',
  styleUrls: ['./maps-modal.component.scss']
})
export class MapsModalComponent extends MzBaseModal implements AfterViewInit {
  constructor(private element: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();

    // enable Materialize tabs with jQuery
    $(this.element.nativeElement).find('.tabs').tabs();
  }
}
