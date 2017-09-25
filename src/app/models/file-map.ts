// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Resource } from './resource';

export class FileMap {
  id: number;
  title = '';
  base = '';
  file = '';
  opened: Date;
  version: number;
  title2 = '';
  resources: Resource[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
