// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Command } from './command';

/**
 * CommandService implements undo/redo using command pattern.
 */
@Injectable()
export class CommandService {

  // Observable sources
  private undoStackChangedSource = new Subject<number>();
  private redoStackChangedSource = new Subject<number>();

  // Observable streams
  undoStackChanged$ = this.undoStackChangedSource.asObservable();
  redoStackChanged$ = this.redoStackChangedSource.asObservable();

  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  exec(command: Command): Observable<any> {
    const observable = command.exec();
    observable.subscribe(
      () => {
        // push only when command has executed successfully
        this.undoStack.push(command);
        this.undoStackChangedSource.next(this.undoStack.length);

        // clear redo stack
        this.redoStack = [];
        this.redoStackChangedSource.next(0);
      }
    );
    return observable;
  }

  undo(): Observable<any> {
    const command = this.undoStack.pop();
    this.undoStackChangedSource.next(this.undoStack.length);

    const observable = command.undo();
    observable.subscribe(
      () => {
        // push only when command has executed successfully
        this.redoStack.push(command);
        this.redoStackChangedSource.next(this.redoStack.length);
      }
    );
    return observable;
  }

  redo(): Observable<any> {
    const command = this.redoStack.pop();
    this.redoStackChangedSource.next(this.redoStack.length);

    const observable = command.exec();
    observable.subscribe(
      () => {
        this.undoStack.push(command);
        this.undoStackChangedSource.next(this.undoStack.length);
      }
    );
    return observable;
  }

  clear() {
    this.clearUndoStack();
    this.clearRedoStack();
  }

  clearUndoStack() {
    this.undoStack = [];
    this.undoStackChangedSource.next(0);
  }

  clearRedoStack() {
    this.redoStack = [];
    this.redoStackChangedSource.next(0);
  }
}
