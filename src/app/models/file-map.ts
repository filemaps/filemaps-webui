// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { Resource } from './resource';

export interface FileMap {
  id: number;
  title: string;
  base: string;
  file: string;
  opened: Date;
  version: number;
  title2: string;
  resources: Resource[];

  draw(): void;
}
