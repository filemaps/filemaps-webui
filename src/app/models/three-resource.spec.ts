// Copyright (C) 2017 File Maps Web UI Authors.
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import { ThreeFileMap } from './three-file-map';
import { ThreeResource } from './three-resource';

describe('ThreeResource', () => {
  it('should create an instance', () => {
    const fileMap = new ThreeFileMap();
    expect(new ThreeResource(fileMap)).toBeTruthy();
  });
});
