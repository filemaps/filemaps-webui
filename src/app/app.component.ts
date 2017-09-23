import { Component } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { DataService } from './data.service';
import { AboutModalComponent } from './layout/about-modal/about-modal.component';
import { MapsModalComponent } from './filemap/maps-modal/maps-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';

  constructor(
    private modalService: MzModalService,
    private dataService: DataService,
  ) {
  }

  public openMapsModal() {
    this.modalService.open(MapsModalComponent);
  }

  public openAboutModal() {
    this.modalService.open(AboutModalComponent);
  }
}
