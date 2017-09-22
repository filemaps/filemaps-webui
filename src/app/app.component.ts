import { Component } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { FileMap } from './file-map';
import { DataService } from './data.service';
import { AboutModalComponent } from './layout/about-modal/about-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService],
})
export class AppComponent {
  title = 'app';
  fileMaps: FileMap[] = [];

  constructor(
    private modalService: MzModalService,
    private dataService: DataService,
  ) {
  }

  public openAboutModal() {
    this.dataService.getAllFileMaps()
      .subscribe(
        (fileMaps) => {
          this.fileMaps = fileMaps;
          console.log('Maps from server', this.fileMaps);
        }
      );
    this.modalService.open(AboutModalComponent);
  }
}
