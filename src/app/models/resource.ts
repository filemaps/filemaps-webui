// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { FileMap } from './file-map';
import { Position } from './position';
import { Style } from './style';

export interface Resource {
  id: number;
  type: number;
  path: string;
  pos: Position;
  style: Style;
  readonly fileMap: FileMap;

  copy(): Resource;
  copyFrom(resource: Resource): Resource;
  draw(): void;
  erase(): void;
  refresh(): void;
  onDragStart(): void;
  onDrag(): void;
  onDragEnd(): void;
  onFollowStart(): void;
  onFollow(offset: Position): void;
  restoreDrag(): void;
  syncPos(): void;
  open(): void;
  close(): void;
  select(): void;
  unselect(): void;
  remove(): void;
}
