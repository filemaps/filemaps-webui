// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { FileInfo } from './file-info';

export class DirContents {
  path: string;
  parent: string;
  contents: FileInfo[];

  constructor(
    values: Object = {}
  ) {
    Object.assign(this, values);

    // assign contents
    const contents: FileInfo[] = [];
    if (this.contents) {
      this.contents.forEach(cont => {
        contents.push(new FileInfo(cont));
      });
    }
    this.contents = contents;
  }
}
