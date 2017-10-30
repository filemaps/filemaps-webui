// Copyright (c) 2017, CodeBoy. All rights reserved.
//
// This Source Code Form is subject to the terms of the
// license that can be found in the LICENSE file.

export class FileApp {
  id: string;
  name: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
