import { Component, OnInit } from '@angular/core';
import { MzBaseModal, MzModalComponent } from 'ng2-materialize';

import { DataService } from '../../data.service';
import { Info } from '../../models/info';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.css']
})

export class AboutModalComponent extends MzBaseModal {
  info = new Info();

  constructor(
    private dataService: DataService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.dataService.getInfo()
      .subscribe(
        (info) => {
          this.info = info;
        }
      );
  }
}
