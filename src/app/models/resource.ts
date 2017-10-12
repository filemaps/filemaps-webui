// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

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
  onDragEnd(): void;
  open(): void;
  close(): void;
  select(): void;
}
