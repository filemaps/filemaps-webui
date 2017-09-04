import { Component } from '@angular/core';
import { MzModalService } from 'ng2-materialize';

import { AboutModalComponent } from './layout/about-modal/about-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private modalService: MzModalService) {
  }

  public openAboutModal() {
    this.modalService.open(AboutModalComponent);
  }
}
