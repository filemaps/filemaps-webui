// Copyright (c) 2018, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Resource } from './resource';
import { Style } from './style';

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
  styles: Style[];
  resources: Resource[];

  draw(): void;
  erase(): void;
  getResource(id: number): Resource;
  getStyleRule(sClass: string, rule: string, defaultVal?: string): string;
}
