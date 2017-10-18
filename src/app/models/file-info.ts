// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

enum ItemType {
  File = 0,
  Dir = 1,
}

export class FileInfo {
  name: string;
  path: string;
  size: number;
  type: ItemType;

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);
  }

  public isDir(): boolean {
    return this.type === ItemType.Dir;
  }
}
