// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

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
