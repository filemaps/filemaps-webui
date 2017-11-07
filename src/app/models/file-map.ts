// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Resource } from './resource';

export interface FileMap {
  id: number;
  title: string;
  description: string;
  base: string;
  file: string;
  opened: Date;
  version: number;
  title2: string;
  exclude: string[];
  resources: Resource[];

  draw(): void;
}
