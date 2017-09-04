import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutModalComponent } from './about-modal/about-modal.component';
import { MaterializeModule } from 'ng2-materialize';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule,
  ],
  exports: [
    AboutModalComponent,
  ],
  declarations: [AboutModalComponent]
})
export class LayoutModule { }
