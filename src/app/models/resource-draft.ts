// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Position } from './position';

/**
 * ResourceDraft is for creating new Resources.
 * See DataService.addResources()
 */
export class ResourceDraft {
  path: string;
  pos: Position;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
