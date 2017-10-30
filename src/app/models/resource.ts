// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { FileMap } from './file-map';
import { Position } from './position';

export interface Resource {
  id: number;
  type: number;
  path: string;
  pos: Position;
  readonly fileMap: FileMap;

  draw(): void;
  onDragStart(): void;
  onDrag(): void;
  onDragEnd(): void;
  open(): void;
  close(): void;
  select(): void;
  unselect(): void;
  remove(): void;
}
