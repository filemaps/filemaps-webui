// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

import { Config } from './config';
import { FileApp } from './file-app';

export class ConfigResponse {
  config: Config;
  fileApps: FileApp[];

  constructor(values: Object = {}) {
    Object.assign(this, values);

    if (this.config) {
      this.config = new Config(this.config);
    }

    // assign fileApps
    const fileApps: FileApp[] = [];
    if (this.fileApps) {
      this.fileApps.forEach(fa => {
        fileApps.push(new FileApp(fa));
      });
    }
    this.fileApps = fileApps;
  }

}
