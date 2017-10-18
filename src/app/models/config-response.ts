// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

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
