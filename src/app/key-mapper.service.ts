// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Injectable } from '@angular/core';

import { CommandService } from './commands/command.service';
import { Renderer } from './renderer.service';

@Injectable()
export class KeyMapper {

  constructor(
    private commandService: CommandService,
    private renderer: Renderer,
  ) { }

  init(canvas: HTMLElement) {
    // set tabindex="0" to be able to receive key press events
    canvas.setAttribute('tabindex', '0');
    canvas.focus();
    canvas.addEventListener('keydown', this.onKeyDown, false);
  }

  private onKeyDown = (event: any) => {
    if (event.keyCode === 90 && !event.shiftKey && event.ctrlKey) {
      // Ctrl + Z: Undo
      event.preventDefault();
      event.stopPropagation();
      this.undo();

    } else if (event.keyCode === 90 && event.shiftKey && event.ctrlKey) {
      // Shift + Ctrl + Z: Redo
      event.preventDefault();
      event.stopPropagation();
      this.redo();

    }
  }

  private undo() {
    if (this.commandService.canUndo()) {
      this.commandService.undo();
      this.renderer.animate();
    }
  }

  private redo() {
    if (this.commandService.canRedo()) {
      this.commandService.redo();
      this.renderer.animate();
    }
  }
}
