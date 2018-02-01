// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Renderer } from '../renderer.service';

const pathSeparator = '/';

/**
 * Tooltip for resource hovering.
 * Uses Materialize CSS classes.
 * NOTE: Tooltips will change in MaterializeCSS v1.0!
 */
@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnDestroy, OnInit {

  posLeft: string;
  posTop: string;
  onSubscription: Subscription;
  offSubscription: Subscription;

  @ViewChild('tooltip') tooltipEl: ElementRef;
  @ViewChild('contentDir') contentDirEl: ElementRef;
  @ViewChild('contentBase') contentBaseEl: ElementRef;

  constructor(
    private element: ElementRef,
    private renderer: Renderer,
  ) {
  }

  ngOnInit() {
    this.onSubscription = this.renderer.hoverOnEventOccurred$.subscribe(
      evt => this.hoverOn(evt)
    );

    this.offSubscription = this.renderer.hoverOffEventOccurred$.subscribe(
      () => this.hoverOff()
    );
  }

  hoverOn(evt: any) {
    this.setContent(evt.object.userData.resource.path);
    this.setPosition(evt);
    this.tooltipEl.nativeElement.style.visibility = 'visible';
  }

  hoverOff() {
    this.tooltipEl.nativeElement.style.visibility = 'hidden';
  }

  ngOnDestroy() {
    this.onSubscription.unsubscribe();
    this.offSubscription.unsubscribe();
  }

  private setContent(path: string) {
    let dir = '';
    let base = path;
    const pos = path.lastIndexOf(pathSeparator);
    if (pos >= 0) {
      dir = path.slice(0, pos + 1);
      base = path.slice(pos + 1);
    }
    this.contentDirEl.nativeElement.innerHTML = dir;
    this.contentBaseEl.nativeElement.innerHTML = base;
  }

  /**
   * Calculates position for tooltip.
   * Tooltip is positioned on top of cursor.
   * Cannot use Angular bindings because we need the changes take effect immediately for calculations.
   */
  private setPosition(evt: any) {
    const marginTop = 25;

    const tooltipHeight = this.tooltipEl.nativeElement.offsetHeight;
    const tooltipWidth = this.tooltipEl.nativeElement.offsetWidth;

    const left = evt.originalEvent.clientX - (tooltipWidth / 2);
    const topPos = evt.originalEvent.clientY - tooltipHeight - marginTop;

    this.tooltipEl.nativeElement.style.left = `${left}px`;
    this.tooltipEl.nativeElement.style.top = `${topPos}px`;
  }
}
