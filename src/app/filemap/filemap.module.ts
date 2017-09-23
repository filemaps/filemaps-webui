import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsModalComponent } from './maps-modal/maps-modal.component';
import { MaterializeModule } from 'ng2-materialize';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
  ],
  exports: [
    MapsModalComponent,
  ],
  declarations: [MapsModalComponent]
})
export class FilemapModule { }
