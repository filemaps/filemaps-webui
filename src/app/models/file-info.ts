// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

enum ItemType {
  File = 0,
  Dir = 1,
}

export class FileInfo {
  name: string;
  path: string;
  size: number;
  type: ItemType;
  selected: boolean;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
  }

  isDir(): boolean {
    return this.type === ItemType.Dir;
  }

  // Returns true if given FileInfo matches this
  equals(fi: FileInfo): boolean {
    return (this.name === fi.name &&
            this.path === fi.path);
  }
}
